/* Validation stricte et publication de la banque One Piece. */
(function(){
  "use strict";
  const source=Array.isArray(window.ONE_PIECE_WIKI_QUESTIONS)?window.ONE_PIECE_WIKI_QUESTIONS:[];
  const bank=source.map((question,index)=>({...question,id:index+1}));
  if(bank.length!==10000)throw new Error(`Banque incomplète : ${bank.length} questions.`);
  if(new Set(bank.map(question=>question.signature)).size!==10000)throw new Error("La banque contient des questions en double.");
  if(new Set(bank.map(question=>question.question.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").trim())).size!==10000)throw new Error("Deux formulations de question sont identiques.");
  if(bank.some(question=>/quel élément de la catégorie|au cœur de cette scène|de quel personnage parle ce résumé|cette personne ou cet élément|d.après le wiki|\[\[|\[…\]/i.test(question.question)||/(?:Le|La) Cette personne/.test(question.question)))throw new Error("La banque contient encore une formulation interdite, un texte à trou ou du wikicode mal nettoyé.");
  const optionKey=value=>value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").trim();
  if(bank.some(question=>question.options.length!==4||!question.options.includes(question.answer)||new Set(question.options.map(optionKey)).size!==4))throw new Error("La banque contient des propositions invalides ou deux réponses équivalentes.");
  const startsUpper=value=>/^[A-ZÀ-ÖØ-Þ]/.test(value),startsLower=value=>/^[a-zà-öø-ÿ]/.test(value);
  if(bank.some(question=>startsUpper(question.answer)&&question.options.filter(option=>option!==question.answer).every(startsLower)))throw new Error("Une bonne réponse est reconnaissable uniquement grâce à sa majuscule.");
  const expected={facile:3000,moyen:3000,difficile:2500,impossible:1500};
  const difficulties=Object.fromEntries(Object.keys(expected).map(level=>[level,bank.filter(question=>question.difficulty===level).length]));
  if(Object.keys(expected).some(level=>difficulties[level]!==expected[level]))throw new Error("La répartition des difficultés One Piece est invalide.");
  if(new Set(bank.map(question=>question.category)).size<8)throw new Error("La banque ne couvre pas assez de thèmes One Piece.");
  if(bank.some(question=>question.difficulty==="facile"&&question.questionKind==="story_chapter"))throw new Error("Une question de chronologie précise ne peut pas être facile.");
  window.ONE_PIECE_QUIZ_QUESTIONS=bank;
  window.ONE_PIECE_QUIZ_META={count:bank.length,categories:[...new Set(bank.map(question=>question.category))],difficulties};
  document.documentElement.dataset.questionCount=String(bank.length);
  document.documentElement.dataset.difficultyCounts=JSON.stringify(difficulties);
})();
