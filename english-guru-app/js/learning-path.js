/* ============================================================
   English Guru — learning-path.js (এক্সট্রা শেখার কনটেন্ট)
   Alphabet, Numbers, Days, Months, Common mistakes
   ============================================================ */

const ALPHABET = [
  {l:"A", sound:"এই", word:"Apple", bn:"আপেল", emoji:"🍎"},
  {l:"B", sound:"বি", word:"Ball", bn:"বল", emoji:"⚽"},
  {l:"C", sound:"সি", word:"Cat", bn:"বিড়াল", emoji:"🐱"},
  {l:"D", sound:"ডি", word:"Dog", bn:"কুকুর", emoji:"🐶"},
  {l:"E", sound:"ই", word:"Egg", bn:"ডিম", emoji:"🥚"},
  {l:"F", sound:"এফ", word:"Fish", bn:"মাছ", emoji:"🐟"},
  {l:"G", sound:"জি", word:"Goat", bn:"ছাগল", emoji:"🐐"},
  {l:"H", sound:"এইচ", word:"Hat", bn:"টুপি", emoji:"👒"},
  {l:"I", sound:"আই", word:"Ice", bn:"বরফ/আইসক্রিম", emoji:"🍦"},
  {l:"J", sound:"জে", word:"Jam", bn:"জ্যাম", emoji:"🍇"},
  {l:"K", sound:"কে", word:"Kite", bn:"ঘুড়ি", emoji:"🪁"},
  {l:"L", sound:"এল", word:"Lion", bn:"সিংহ", emoji:"🦁"},
  {l:"M", sound:"এম", word:"Moon", bn:"চাঁদ", emoji:"🌙"},
  {l:"N", sound:"এন", word:"Nest", bn:"বাসা (পাখির)", emoji:"🪺"},
  {l:"O", sound:"ও", word:"Orange", bn:"কমলা", emoji:"🍊"},
  {l:"P", sound:"পি", word:"Pen", bn:"কলম", emoji:"🖊️"},
  {l:"Q", sound:"কিউ", word:"Queen", bn:"রানী", emoji:"👑"},
  {l:"R", sound:"আর", word:"Rain", bn:"বৃষ্টি", emoji:"🌧️"},
  {l:"S", sound:"এস", word:"Sun", bn:"সূর্য", emoji:"☀️"},
  {l:"T", sound:"টি", word:"Tree", bn:"গাছ", emoji:"🌳"},
  {l:"U", sound:"ইউ", word:"Umbrella", bn:"ছাতা", emoji:"☂️"},
  {l:"V", sound:"ভি", word:"Van", bn:"ভ্যান", emoji:"🚐"},
  {l:"W", sound:"ডাবলিউ", word:"Watch", bn:"ঘড়ি", emoji:"⌚"},
  {l:"X", sound:"এক্স", word:"Box", bn:"বাক্স", emoji:"📦"},
  {l:"Y", sound:"ওয়াই", word:"Yellow", bn:"হলুদ", emoji:"🌟"},
  {l:"Z", sound:"জেড", word:"Zoo", bn:"চিড়িয়াখানা", emoji:"🦁"}
];

const NUMBERS = [
  {en:"1 One", bn:"১ এক"},{en:"2 Two", bn:"২ দুই"},{en:"3 Three", bn:"৩ তিন"},
  {en:"4 Four", bn:"৪ চার"},{en:"5 Five", bn:"৫ পাঁচ"},{en:"6 Six", bn:"৬ ছয়"},
  {en:"7 Seven", bn:"৭ সাত"},{en:"8 Eight", bn:"৮ আট"},{en:"9 Nine", bn:"৯ নয়"},
  {en:"10 Ten", bn:"১০ দশ"},{en:"11 Eleven", bn:"১১ এগারো"},{en:"12 Twelve", bn:"১২ বারো"},
  {en:"20 Twenty", bn:"২০ বিশ"},{en:"30 Thirty", bn:"৩০ ত্রিশ"},{en:"40 Forty", bn:"৪০ চল্লিশ"},
  {en:"50 Fifty", bn:"৫০ পঞ্চাশ"},{en:"100 One Hundred", bn:"১০০ একশত"}
];

const DAYS = [
  {en:"Monday", bn:"সোমবার"},{en:"Tuesday", bn:"মঙ্গলবার"},{en:"Wednesday", bn:"বুধবার"},
  {en:"Thursday", bn:"বৃহস্পতিবার"},{en:"Friday", bn:"শুক্রবার"},{en:"Saturday", bn:"শনিবার"},
  {en:"Sunday", bn:"রবিবার"}
];

const MONTHS = [
  {en:"January", bn:"জানুয়ারি"},{en:"February", bn:"ফেব্রুয়ারি"},{en:"March", bn:"মার্চ"},
  {en:"April", bn:"এপ্রিল"},{en:"May", bn:"মে"},{en:"June", bn:"জুন"},
  {en:"July", bn:"জুলাই"},{en:"August", bn:"আগস্ট"},{en:"September", bn:"সেপ্টেম্বর"},
  {en:"October", bn:"অক্টোবর"},{en:"November", bn:"নভেম্বর"},{en:"December", bn:"ডিসেম্বর"}
];

const COMMON_MISTAKES = [
  {wrong:"I am agree.", right:"I agree.", why:"agree নিজেই verb — 'I am' দিতে হয় না।"},
  {wrong:"I didn't went.", right:"I didn't go.", why:"didn't/don't পরে verb-এর main form (go) — past form (went) নয়।"},
  {wrong:"She have a car.", right:"She has a car.", why:"She/He/It এর সাথে have নয় — has।"},
  {wrong:"I am loving this song.", right:"I love this song.", why:"love/like/want/know — এগুলো continuous (ing) হয় না।"},
  {wrong:"He is go to school.", right:"He goes to school.", why:"Present Simple-এ ৩য় পুরুষ (he/she) এর সাথে verb এর সাথে s/es যোগ হয়।"},
  {wrong:"Where you are from?", right:"Where are you from?", why:"প্রশ্নে সাহায্যকারী verb (are) আগে বসে।"},
  {wrong:"How much years?", right:"How many years?", why:"গণনাযোগ্য বিষয়ে how many — মাপযোগ্য (যেমন পানি) হলে how much।"},
  {wrong:"I have 20 years old.", right:"I am 20 years old.", why:"বয়স বলতে 'I am + years old'।"},
  {wrong:"I am boring.", right:"I am bored.", why:"bored = ক্লান্ত (আপনি), boring = ক্লান্তিকর (কিছু)।"},
  {wrong:"She can to swim.", right:"She can swim.", why:"can/could/will/would পরে 'to' দেওয়া হয় না।"}
];

const TENSE_CHART = [
  {name:"Present Simple", formula:"Subject + verb1 (he/she হলে verb1+s)", use:"প্রতিদিনের কাজ, সত্য", example:"She goes to school.", bn:"সে স্কুলে যায়।"},
  {name:"Present Continuous", formula:"am/is/are + verb+ing", use:"এই মুহূর্তে চলমান", example:"She is going now.", bn:"সে এখন যাচ্ছে।"},
  {name:"Present Perfect", formula:"have/has + verb3", use:"সবে শেষ হয়েছে", example:"She has gone.", bn:"সে গিয়েছে।"},
  {name:"Present Perfect Continuous", formula:"have/has been + verb+ing", use:"চলমান + সময় ব্যবধান", example:"She has been studying for 2 hours.", bn:"সে ২ ঘণ্টা ধরে পড়ছে।"},
  {name:"Past Simple", formula:"Subject + verb2", use:"অতীতে শেষ হয়ে যাওয়া কাজ", example:"She went.", bn:"সে গেছিল।"},
  {name:"Past Continuous", formula:"was/were + verb+ing", use:"অতীতে চলমান ছিল", example:"She was going.", bn:"সে যাচ্ছিল।"},
  {name:"Past Perfect", formula:"had + verb3", use:"অতীতের আগে শেষ হয়ে যাওয়া", example:"She had gone.", bn:"সে গিয়েছিল।"},
  {name:"Past Perfect Continuous", formula:"had been + verb+ing", use:"অতীতে চলমান ছিল (সময় ধরে)", example:"She had been studying for 3 hours.", bn:"সে ৩ ঘণ্টা ধরে পড়ছিল।"},
  {name:"Future Simple", formula:"will + verb1", use:"ভবিষ্যৎ সিদ্ধান্ত", example:"She will go.", bn:"সে যাবে।"},
  {name:"Future Continuous", formula:"will be + verb+ing", use:"ভবিষ্যতে চলমান থাকবে", example:"She will be going.", bn:"সে যাচ্ছে থাকবে।"},
  {name:"Future Perfect", formula:"will have + verb3", use:"ভবিষ্যতে সম্পন্ন হবে", example:"She will have gone.", bn:"সে চলে গেয়ে থাকবে।"},
  {name:"Future Perfect Continuous", formula:"will have been + verb+ing", use:"ভবিষ্যতে চলমান সময় ধরে", example:"She will have been studying.", bn:"সে পড়তে পড়তে থাকবে।"}
];

const GRAMMAR_RULES = [
  {title:"১. বাক্যের ৫টা মূল উপাদান", desc:"Subject (কে), Verb (কী করছে), Object (কাকে/কাকে নিয়ে), Adjective (বর্ণনা), Adverb (কীভাবে/কখন)।"},
  {title:"২. Subject-Verb Agreement", desc:"He/She/It (৩য় পুরুষ) এর সাথে verb এর শেষে s/es বসে। They/We/You/I এর সাথে বসে না।"},
  {title:"৩. Article (a/an/the)", desc:"a = যেকোনো একটা (consonant আগে), an = স্বরবর্ণ আগে (an apple), the = নির্দিষ্ট।"},
  {title:"৪. Tense ১২টি", desc:"৩টা সময় × ৪টা ধরন (Simple/Continuous/Perfect/Perfect Continuous) = ১২টি Tense।"},
  {title:"৫. Active & Passive", desc:"Active: I eat rice. Passive: Rice is eaten by me. সাধারণত active বেশি ব্যবহার হয়।"},
  {title:"৬. Direct & Indirect Speech", desc:"Direct: He said, 'I am happy.' Indirect: He said that he was happy."},
  {title:"৭. Conjunction", desc:"and, but, or, because, so, if, when, while — বাক্য জোড়া দিতে।"},
  {title:"৮. Preposition", desc:"in/on/at/for/by/with/to/from — সময়, জায়গা, দিক বোঝাতে।"}
];

const QUESTION_TYPES = [
  {type:"What", bn:"কী / কোন", example:"What is this? — এটা কী?", use:"জিনিসের পরিচয় বোঝাতে"},
  {type:"Who", bn:"কে", example:"Who is he? — তিনি কে?", use:"মানুষের পরিচয়"},
  {type:"Where", bn:"কোথায়", example:"Where do you live? — কোথায় থাকো?", use:"স্থান"},
  {type:"When", bn:"কখন", example:"When do you wake up? — কখন ঘুম থেকে ওঠো?", use:"সময়"},
  {type:"How", bn:"কীভাবে / কেমন", example:"How are you? — কেমন আছো?", use:"অবস্থা/পদ্ধতি"},
  {type:"Why", bn:"কেন", example:"Why are you late? — কেন দেরি করেছ?", use:"কারণ"},
  {type:"How much/many", bn:"কত", example:"How much is it? — দাম কত?", use:"সংখ্যা/দাম"},
  {type:"Which", bn:"কোনটা", example:"Which color do you like? — কোন রঙ পছন্দ?", use:"পছন্দ"}
];

const PARTS_OF_SPEECH = [
  {part:"Noun (নামাংকরণ)", bn:"মানুষ, জায়গা, জিনিস, ভাব — boy, Dhaka, water, love"},
  {part:"Pronoun (সর্বনাম)", bn:"নামের বিকল্প — I, you, he, she, we, they, this, that"},
  {part:"Verb (ক্রিয়া)", bn:"কাজ — go, eat, read, play, is, are, have"},
  {part:"Adjective (বর্ণনা)", bn:"কী রকম — big, small, good, bad, beautiful, happy"},
  {part:"Adverb (ক্রিয়া-বর্ণনা)", bn:"কীভাবে/কখন — quickly, always, never, yesterday"},
  {part:"Preposition (পদাশ্রয়ী)", bn:"জায়গা/সময় সম্পর্ক — in, on, at, by, for, with"},
  {part:"Conjunction (অনুসূচী)", bn:"জোড়া দেওয়া — and, but, or, because, so, if"},
  {part:"Interjection (অব্যয়)", bn:"আবেগ — Oh! Wow! Alas! Congratulations!"}
];
