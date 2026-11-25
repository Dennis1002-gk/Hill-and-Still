// Mô hình lai MVP: luật nền + hồ sơ sở thích cá nhân cập nhật bằng phản hồi.
// Trọng số chỉ là giả thuyết kỹ thuật ban đầu, cần hiệu chỉnh bằng dữ liệu nghiên cứu.
window.HSRecommender = (() => {
  const KEY = "hs_mvp01_profile";
  const defaults = {genreBoost:{}, energyBias:0, vocalBoost:{}, trackBoost:{}, feedbackCount:0};
  const load = () => { try { return {...defaults,...JSON.parse(localStorage.getItem(KEY)||"{}")}; } catch { return {...defaults}; } };
  const save = p => localStorage.setItem(KEY, JSON.stringify(p));
  function score(sound, user, profile) {
    let preference = 50, stateFit = 50, goalFit = 50;
    if(user.genre !== "any") preference += sound.genre === user.genre ? 35 : -12;
    preference += profile.genreBoost[sound.genre] || 0;
    if(user.vocal !== "any" && sound.vocal !== null) preference += (user.vocal === "yes") === sound.vocal ? 12 : -12;
    preference += profile.vocalBoost[String(sound.vocal)] || 0;
    if(user.goal === "calm") goalFit += (3 - sound.energy) * 12;
    if(user.goal === "focus") goalFit += (3 - Math.abs(sound.energy-3)) * 10;
    if(user.goal === "energize") goalFit += (sound.energy-3) * 13;
    if(user.goal === "uplift") goalFit += (sound.energy-2) * 8;
    if(user.goal === "maintain") goalFit += 8 - Math.abs(sound.energy-user.energy)*8;
    if(user.stress >= 7 && sound.energy >= 5) stateFit -= 12;
    if(user.energy <= 2 && user.goal === "energize" && sound.energy >= 4) stateFit += 8;
    if(user.mood === "restless" && sound.energy >= 5 && user.goal === "calm") stateFit -= 18;
    stateFit += (profile.energyBias || 0) * (sound.energy-3);
    const personalTrack = profile.trackBoost[sound.id] || 0;
    const ruleScore = .35*preference + .30*stateFit + .35*goalFit;
    const finalScore = Math.max(0,Math.min(100,ruleScore + personalTrack));
    return {score:finalScore, preference, stateFit, goalFit};
  }
  function recommendAll(sounds,user) {
    const p=load();
    return sounds.map(s=>({sound:s,...score(s,user,p)})).sort((a,b)=>b.score-a.score);
  }
  function recommend(sounds,user) { return recommendAll(sounds,user).slice(0,5); }
  function learn(sound,user,fit,comfort) {
    const p=load(), delta=((fit-3)*1.8)+((comfort-3)*1.0);
    p.trackBoost[sound.id]=Math.max(-15,Math.min(15,(p.trackBoost[sound.id]||0)+delta));
    if(user.genre!=="any") p.genreBoost[user.genre]=Math.max(-12,Math.min(12,(p.genreBoost[user.genre]||0)+(fit-3)*.7));
    p.energyBias=Math.max(-1.5,Math.min(1.5,(p.energyBias||0)+(fit-3)*.04));
    p.feedbackCount=(p.feedbackCount||0)+1; save(p); return p;
  }
  return {recommend,recommendAll,learn,load};
})();
