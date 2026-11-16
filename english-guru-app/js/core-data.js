/* ============================================================
   English Guru — core-data.js
   Dictionary, lessons, shortcuts, kids content, scenarios
   All content editable from Admin Panel
   ============================================================ */

// ------------------------- DICTIONARY -------------------------
const DEFAULT_DICT = [
  // --- Everyday ---
  {en:"hello", ph:"/həˈloʊ/", bn:"হ্যালো / নমস্কার", pos:"interjection", cat:"Everyday", ex:"Hello, how are you?", exBn:"হ্যালো, কেমন আছো?"},
  {en:"good morning", ph:"/ɡʊd ˈmɔːrnɪŋ/", bn:"শুভ সকাল", pos:"greeting", cat:"Everyday", ex:"Good morning, teacher!", exBn:"শুভ সকাল, স্যার!"},
  {en:"thank you", ph:"/θæŋk juː/", bn:"ধন্যবাদ", pos:"phrase", cat:"Everyday", ex:"Thank you for your help.", exBn:"তোমার সাহায্যের জন্য ধন্যবাদ।"},
  {en:"please", ph:"/pliːz/", bn:"অনুগ্রহ করে", pos:"adverb", cat:"Everyday", ex:"Please sit down.", exBn:"অনুগ্রহ করে বসো।"},
  {en:"sorry", ph:"/ˈsɒri/", bn:"দুঃখিত / মাফ করো", pos:"adjective", cat:"Everyday", ex:"I am sorry for being late.", exBn:"দেরি করার জন্য দুঃখিত।"},
  {en:"water", ph:"/ˈwɔːtər/", bn:"পানি", pos:"noun", cat:"Everyday", ex:"I want to drink water.", exBn:"আমি পানি খেতে চাই।"},
  {en:"food", ph:"/fuːd/", bn:"খাবার", pos:"noun", cat:"Everyday", ex:"The food is delicious.", exBn:"খাবারটা মজাদার।"},
  {en:"friend", ph:"/frend/", bn:"বন্ধু", pos:"noun", cat:"Everyday", ex:"He is my best friend.", exBn:"সে আমার সবচেয়ে ভালো বন্ধু।"},
  {en:"mother", ph:"/ˈmʌðər/", bn:"মা", pos:"noun", cat:"Everyday", ex:"My mother cooks well.", exBn:"আমার মা ভালো রান্না করেন।"},
  {en:"father", ph:"/ˈfɑːðər/", bn:"বাবা", pos:"noun", cat:"Everyday", ex:"My father is a doctor.", exBn:"আমার বাবা একজন ডাক্তার।"},
  {en:"school", ph:"/skuːl/", bn:"স্কুল", pos:"noun", cat:"Everyday", ex:"I go to school every day.", exBn:"আমি প্রতিদিন স্কুলে যাই।"},
  {en:"home", ph:"/hoʊm/", bn:"বাড়ি", pos:"noun", cat:"Everyday", ex:"I am going home now.", exBn:"আমি এখন বাড়ি যাচ্ছি।"},
  {en:"book", ph:"/bʊk/", bn:"বই", pos:"noun", cat:"Everyday", ex:"This book is very interesting.", exBn:"এই বইটা খুব মজার।"},
  {en:"time", ph:"/taɪm/", bn:"সময়", pos:"noun", cat:"Everyday", ex:"What time is it?", exBn:"কয়টা বাজে?"},
  {en:"work", ph:"/wɜːrk/", bn:"কাজ", pos:"noun", cat:"Everyday", ex:"I have a lot of work today.", exBn:"আজ আমার অনেক কাজ।"},
  {en:"love", ph:"/lʌv/", bn:"ভালোবাসা", pos:"noun", cat:"Everyday", ex:"I love my country.", exBn:"আমি আমার দেশকে ভালোবাসি।"},
  {en:"happy", ph:"/ˈhæpi/", bn:"খুশি", pos:"adjective", cat:"Everyday", ex:"I am happy today.", exBn:"আমি আজ খুশি।"},
  {en:"good", ph:"/ɡʊd/", bn:"ভালো", pos:"adjective", cat:"Everyday", ex:"This is a good idea.", exBn:"এটা ভালো একটা আইডিয়া।"},
  {en:"bad", ph:"/bæd/", bn:"খারাপ", pos:"adjective", cat:"Everyday", ex:"The weather is bad today.", exBn:"আজ আবহাওয়া খারাপ।"},
  {en:"beautiful", ph:"/ˈbjuːtɪfl/", bn:"সুন্দর", pos:"adjective", cat:"Everyday", ex:"What a beautiful place!", exBn:"কী সুন্দর জায়গা!"},

  // --- Greetings & courtesy ---
  {en:"goodbye", ph:"/ɡʊdˈbaɪ/", bn:"বিদায় / আসসালামু আলাইকুম", pos:"phrase", cat:"Greetings", ex:"Goodbye, see you tomorrow.", exBn:"বিদায়, আগামীকাল দেখা হবে।"},
  {en:"good night", ph:"/ɡʊd naɪt/", bn:"শুভ রাত্রি", pos:"phrase", cat:"Greetings", ex:"Good night, sleep well.", exBn:"শুভ রাত্রি, ভালো ঘুমাও।"},
  {en:"excuse me", ph:"/ɪkˈskjuːz miː/", bn:"মাফ করবেন", pos:"phrase", cat:"Greetings", ex:"Excuse me, where is the station?", exBn:"মাফ করবেন, স্টেশন কোথায়?"},
  {en:"welcome", ph:"/ˈwelkəm/", bn:"স্বাগতম", pos:"noun", cat:"Greetings", ex:"Welcome to our school.", exBn:"আমাদের স্কুলে স্বাগতম।"},
  {en:"how are you", ph:"/haʊ ɑːr juː/", bn:"কেমন আছো?", pos:"phrase", cat:"Greetings", ex:"Hi! How are you today?", exBn:"হাই! আজ কেমন আছো?"},
  {en:"nice to meet you", ph:"/naɪs tə miːt juː/", bn:"তোমার সাথে পরিচিত হয়ে ভালো লাগলো", pos:"phrase", cat:"Greetings", ex:"Nice to meet you, Mr. Khan.", exBn:"মিস্টার খান, আপনার সাথে পরিচিত হয়ে ভালো লাগলো।"},
  {en:"congratulations", ph:"/kənˌɡrætʃəˈleɪʃənz/", bn:"অভিনন্দন", pos:"noun", cat:"Greetings", ex:"Congratulations on your success!", exBn:"তোমার সফলতার জন্য অভিনন্দন!"},
  {en:"good luck", ph:"/ɡʊd lʌk/", bn:"শুভকামনা", pos:"phrase", cat:"Greetings", ex:"Good luck with your exam!", exBn:"তোমার পরীক্ষার জন্য শুভকামনা!"},

  // --- Family ---
  {en:"brother", ph:"/ˈbrʌðər/", bn:"ভাই", pos:"noun", cat:"Family", ex:"My brother is very tall.", exBn:"আমার ভাই খুব লম্বা।"},
  {en:"sister", ph:"/ˈsɪstər/", bn:"বোন", pos:"noun", cat:"Family", ex:"My sister loves reading.", exBn:"আমার বোন পড়তে ভালোবাসে।"},
  {en:"son", ph:"/sʌn/", bn:"ছেলে সন্তান", pos:"noun", cat:"Family", ex:"Their son is five years old.", exBn:"তাদের ছেলেটি পাঁচ বছরের।"},
  {en:"daughter", ph:"/ˈdɔːtər/", bn:"মেয়ে সন্তান", pos:"noun", cat:"Family", ex:"Her daughter is a student.", exBn:"তার মেয়েটি একজন ছাত্রী।"},
  {en:"family", ph:"/ˈfæməli/", bn:"পরিবার", pos:"noun", cat:"Family", ex:"I love my family.", exBn:"আমি আমার পরিবারকে ভালোবাসি।"},
  {en:"grandmother", ph:"/ˈɡrænmʌðər/", bn:"দাদা/নানার মা, দাদি/নানি", pos:"noun", cat:"Family", ex:"My grandmother tells stories.", exBn:"আমার দাদি গল্প বলেন।"},
  {en:"grandfather", ph:"/ˈɡrænfɑːðər/", bn:"দাদা/নানা", pos:"noun", cat:"Family", ex:"My grandfather walks every morning.", exBn:"আমার দাদা প্রতিদিন সকালে হাঁটেন।"},
  {en:"uncle", ph:"/ˈʌŋkl/", bn:"চাচা/মামা", pos:"noun", cat:"Family", ex:"Uncle, please come in.", exBn:"চাচা, ভিতরে আসুন।"},
  {en:"aunt", ph:"/ænt/", bn:"চাচি/মাসি", pos:"noun", cat:"Family", ex:"My aunt lives in Dhaka.", exBn:"আমার চাচি ঢাকায় থাকেন।"},
  {en:"child", ph:"/tʃaɪld/", bn:"শিশু", pos:"noun", cat:"Family", ex:"The child is playing.", exBn:"শিশুটি খেলছে।"},

  // --- Numbers & time ---
  {en:"one", ph:"/wʌn/", bn:"এক", pos:"number", cat:"Numbers", ex:"I have one brother.", exBn:"আমার এক ভাই আছে।"},
  {en:"two", ph:"/tuː/", bn:"দুই", pos:"number", cat:"Numbers", ex:"Give me two minutes.", exBn:"আমাকে দুই মিনিট দাও।"},
  {en:"three", ph:"/θriː/", bn:"তিন", pos:"number", cat:"Numbers", ex:"Three books are on the table.", exBn:"টেবিলে তিনটা বই আছে।"},
  {en:"ten", ph:"/ten/", bn:"দশ", pos:"number", cat:"Numbers", ex:"The class starts at ten.", exBn:"ক্লাস দশটায় শুরু হয়।"},
  {en:"hundred", ph:"/ˈhʌndrəd/", bn:"শত / একশ", pos:"number", cat:"Numbers", ex:"The shirt costs two hundred taka.", exBn:"শার্টটার দাম দুইশ টাকা।"},
  {en:"today", ph:"/təˈdeɪ/", bn:"আজ", pos:"adverb", cat:"Numbers", ex:"Today is Friday.", exBn:"আজ শুক্রবার।"},
  {en:"tomorrow", ph:"/təˈmɒroʊ/", bn:"আগামীকাল", pos:"adverb", cat:"Numbers", ex:"I will call you tomorrow.", exBn:"আমি আগামীকাল তোমাকে ফোন করবো।"},
  {en:"yesterday", ph:"/ˈjestərdeɪ/", bn:"গতকাল", pos:"adverb", cat:"Numbers", ex:"Yesterday was a holiday.", exBn:"গতকাল ছুটির দিন ছিল।"},
  {en:"morning", ph:"/ˈmɔːrnɪŋ/", bn:"সকাল", pos:"noun", cat:"Numbers", ex:"I study in the morning.", exBn:"আমি সকালে পড়ি।"},
  {en:"night", ph:"/naɪt/", bn:"রাত", pos:"noun", cat:"Numbers", ex:"I sleep at night.", exBn:"আমি রাতে ঘুমাই।"},

  // --- Food & eating ---
  {en:"rice", ph:"/raɪs/", bn:"ভাত", pos:"noun", cat:"Food", ex:"We eat rice at lunch.", exBn:"আমরা দুপুরে ভাত খাই।"},
  {en:"fish", ph:"/fɪʃ/", bn:"মাছ", pos:"noun", cat:"Food", ex:"This fish is fresh.", exBn:"এই মাছটা টাটকা।"},
  {en:"bread", ph:"/bred/", bn:"রুটি/পাউরুটি", pos:"noun", cat:"Food", ex:"I eat bread for breakfast.", exBn:"আমি সকালে রুটি খাই।"},
  {en:"milk", ph:"/mɪlk/", bn:"দুধ", pos:"noun", cat:"Food", ex:"Drink milk every day.", exBn:"প্রতিদিন দুধ খাও।"},
  {en:"tea", ph:"/tiː/", bn:"চা", pos:"noun", cat:"Food", ex:"Father drinks tea in the morning.", exBn:"বাবা সকালে চা খান।"},
  {en:"egg", ph:"/eɡ/", bn:"ডিম", pos:"noun", cat:"Food", ex:"I like boiled eggs.", exBn:"আমি সিদ্ধ ডিম পছন্দ করি।"},
  {en:"fruit", ph:"/fruːt/", bn:"ফল", pos:"noun", cat:"Food", ex:"Eat fruit every day.", exBn:"প্রতিদিন ফল খাও।"},
  {en:"mango", ph:"/ˈmæŋɡoʊ/", bn:"আম", pos:"noun", cat:"Food", ex:"Mango is my favorite fruit.", exBn:"আম আমার প্রিয় ফল।"},
  {en:"hungry", ph:"/ˈhʌŋɡri/", bn:"ক্ষুধার্ত / খিদা পাওয়া", pos:"adjective", cat:"Food", ex:"I am very hungry now.", exBn:"আমার এখন খুব খিদা পেয়েছে।"},
  {en:"delicious", ph:"/dɪˈlɪʃəs/", bn:"সুস্বাদু / মজাদার", pos:"adjective", cat:"Food", ex:"The biryani was delicious.", exBn:"বিরিয়ানিটা মজাদার ছিল।"},

  // --- Travel ---
  {en:"train", ph:"/treɪn/", bn:"ট্রেন", pos:"noun", cat:"Travel", ex:"The train leaves at 8 AM.", exBn:"ট্রেনটা সকাল ৮টায় ছাড়ে।"},
  {en:"bus", ph:"/bʌs/", bn:"বাস", pos:"noun", cat:"Travel", ex:"I take the bus to work.", exBn:"আমি বাসে করে কাজে যাই।"},
  {en:"ticket", ph:"/ˈtɪkɪt/", bn:"টিকেট", pos:"noun", cat:"Travel", ex:"Where can I buy a ticket?", exBn:"টিকেট কোথায় কিনতে পারবো?"},
  {en:"station", ph:"/ˈsteɪʃən/", bn:"স্টেশন", pos:"noun", cat:"Travel", ex:"The station is very crowded.", exBn:"স্টেশনটা খুব ভিড়ে ভরা।"},
  {en:"airport", ph:"/ˈerpɔːrt/", bn:"বিমানবন্দর", pos:"noun", cat:"Travel", ex:"How far is the airport?", exBn:"বিমানবন্দর কত দূরে?"},
  {en:"road", ph:"/roʊd/", bn:"রাস্তা", pos:"noun", cat:"Travel", ex:"This road goes to Dhaka.", exBn:"এই রাস্তা ঢাকায় যায়।"},
  {en:"journey", ph:"/ˈdʒɜːrni/", bn:"যাত্রা", pos:"noun", cat:"Travel", ex:"Have a safe journey!", exBn:"যাত্রা শুভ হোক!"},
  {en:"luggage", ph:"/ˈlʌɡɪdʒ/", bn:"লাগেজ / মালপত্র", pos:"noun", cat:"Travel", ex:"Please take your luggage.", exBn:"অনুগ্রহ করে আপনার লাগেজ নিন।"},
  {en:"hotel", ph:"/hoʊˈtel/", bn:"হোটেল", pos:"noun", cat:"Travel", ex:"The hotel is near the beach.", exBn:"হোটেলটা সমুদ্র সৈকতের কাছে।"},
  {en:"left", ph:"/left/", bn:"বাম", pos:"noun", cat:"Travel", ex:"Turn left at the corner.", exBn:"মোড়ে বামে যান।"},

  // --- Office & study ---
  {en:"study", ph:"/ˈstʌdi/", bn:"পড়াশোনা করা", pos:"verb", cat:"Study & Work", ex:"I study English every day.", exBn:"আমি প্রতিদিন ইংরেজি পড়ি।"},
  {en:"teacher", ph:"/ˈtiːtʃər/", bn:"শিক্ষক", pos:"noun", cat:"Study & Work", ex:"Our teacher is very kind.", exBn:"আমাদের শিক্ষক খুব দয়ালু।"},
  {en:"student", ph:"/ˈstuːdənt/", bn:"ছাত্র/ছাত্রী", pos:"noun", cat:"Study & Work", ex:"She is a good student.", exBn:"সে একজন ভালো ছাত্রী।"},
  {en:"exam", ph:"/ɪɡˈzæm/", bn:"পরীক্ষা", pos:"noun", cat:"Study & Work", ex:"The exam starts on Sunday.", exBn:"পরীক্ষা রবিবার শুরু হবে।"},
  {en:"question", ph:"/ˈkwestʃən/", bn:"প্রশ্ন", pos:"noun", cat:"Study & Work", ex:"Ask me any question.", exBn:"আমাকে যেকোনো প্রশ্ন করো।"},
  {en:"answer", ph:"/ˈænsər/", bn:"উত্তর", pos:"noun", cat:"Study & Work", ex:"Your answer is correct.", exBn:"তোমার উত্তরটি সঠিক।"},
  {en:"office", ph:"/ˈɒfɪs/", bn:"অফিস", pos:"noun", cat:"Study & Work", ex:"I reached the office at 9.", exBn:"আমি ৯টায় অফিসে পৌঁছেছি।"},
  {en:"meeting", ph:"/ˈmiːtɪŋ/", bn:"মিটিং / সভা", pos:"noun", cat:"Study & Work", ex:"The meeting starts at noon.", exBn:"মিটিং দুপুরে শুরু হবে।"},
  {en:"salary", ph:"/ˈsæləri/", bn:"বেতন", pos:"noun", cat:"Study & Work", ex:"He gets a good salary.", exBn:"সে ভালো বেতন পায়।"},
  {en:"interview", ph:"/ˈɪntərvjuː/", bn:"সাক্ষাৎকার / ভাইভা", pos:"noun", cat:"Study & Work", ex:"I have an interview tomorrow.", exBn:"আগামীকাল আমার একটা ভাইভা আছে।"},

  // --- Feelings ---
  {en:"angry", ph:"/ˈæŋɡri/", bn:"রাগান্বিত", pos:"adjective", cat:"Feelings", ex:"Don't be angry with me.", exBn:"আমার প্রতি রাগ করো না।"},
  {en:"sad", ph:"/sæd/", bn:"দুঃখিত / মন খারাপ", pos:"adjective", cat:"Feelings", ex:"Why are you sad?", exBn:"তুমি কেন মন খারাপ করছো?"},
  {en:"tired", ph:"/ˈtaɪərd/", bn:"ক্লান্ত", pos:"adjective", cat:"Feelings", ex:"I am tired after work.", exBn:"কাজের পর আমি ক্লান্ত।"},
  {en:"afraid", ph:"/əˈfreɪd/", bn:"ভয় পাওয়া", pos:"adjective", cat:"Feelings", ex:"Don't be afraid of dogs.", exBn:"কুকুরে ভয় পেয়ো না।"},
  {en:"excited", ph:"/ɪkˈsaɪtɪd/", bn:"উত্তেজিত / আবেগাপ্লুত", pos:"adjective", cat:"Feelings", ex:"I am excited about the trip.", exBn:"ট্রিপ নিয়ে আমি রোমাঞ্চিত।"},
  {en:"proud", ph:"/praʊd/", bn:"গর্বিত", pos:"adjective", cat:"Feelings", ex:"I am proud of you.", exBn:"আমি তোমার উপর গর্ব করি।"},
  {en:"worried", ph:"/ˈwʌrid/", bn:"চিন্তিত", pos:"adjective", cat:"Feelings", ex:"Mother is worried about you.", exBn:"মা তোমার জন্য চিন্তিত।"},
  {en:"surprised", ph:"/sərˈpraɪzd/", bn:"অবাক / বিস্মিত", pos:"adjective", cat:"Feelings", ex:"I was surprised to see him.", exBn:"তাকে দেখে আমি অবাক হয়েছি।"},

  // --- Actions (verbs) ---
  {en:"eat", ph:"/iːt/", bn:"খাওয়া", pos:"verb", cat:"Verbs", ex:"We eat dinner at 9 PM.", exBn:"আমরা রাত ৯টায় ডিনার খাই।"},
  {en:"drink", ph:"/drɪŋk/", bn:"পান করা", pos:"verb", cat:"Verbs", ex:"Drink more water.", exBn:"বেশি পানি পান করো।"},
  {en:"go", ph:"/ɡoʊ/", bn:"যাওয়া", pos:"verb", cat:"Verbs", ex:"Let's go to the market.", exBn:"চলো বাজারে যাই।"},
  {en:"come", ph:"/kʌm/", bn:"আসা", pos:"verb", cat:"Verbs", ex:"Come to my house.", exBn:"আমার বাড়িতে আসো।"},
  {en:"read", ph:"/riːd/", bn:"পড়া", pos:"verb", cat:"Verbs", ex:"Read this book.", exBn:"এই বইটা পড়ো।"},
  {en:"write", ph:"/raɪt/", bn:"লেখা", pos:"verb", cat:"Verbs", ex:"Write your name here.", exBn:"এখানে তোমার নাম লেখো।"},
  {en:"speak", ph:"/spiːk/", bn:"কথা বলা", pos:"verb", cat:"Verbs", ex:"Speak slowly, please.", exBn:"ধীরে কথা বলো, অনুগ্রহ করে।"},
  {en:"listen", ph:"/ˈlɪsən/", bn:"শোনা", pos:"verb", cat:"Verbs", ex:"Listen to your teacher.", exBn:"শিক্ষকের কথা শোনো।"},
  {en:"sleep", ph:"/sliːp/", bn:"ঘুমানো", pos:"verb", cat:"Verbs", ex:"I sleep for eight hours.", exBn:"আমি আট ঘণ্টা ঘুমাই।"},
  {en:"run", ph:"/rʌn/", bn:"দৌড়ানো", pos:"verb", cat:"Verbs", ex:"He can run very fast.", exBn:"সে খুব দ্রুত দৌড়াতে পারে।"},
  {en:"learn", ph:"/lɜːrn/", bn:"শেখা", pos:"verb", cat:"Verbs", ex:"I want to learn English.", exBn:"আমি ইংরেজি শিখতে চাই।"},
  {en:"understand", ph:"/ˌʌndərˈstænd/", bn:"বোঝা", pos:"verb", cat:"Verbs", ex:"I don't understand this word.", exBn:"এই শব্দটা আমি বুঝি না।"},
  {en:"help", ph:"/help/", bn:"সাহায্য করা", pos:"verb", cat:"Verbs", ex:"Can you help me?", exBn:"তুমি কি আমাকে সাহায্য করতে পারো?"},
  {en:"buy", ph:"/baɪ/", bn:"কেনা", pos:"verb", cat:"Verbs", ex:"I want to buy a phone.", exBn:"আমি একটা ফোন কিনতে চাই।"},
  {en:"watch", ph:"/wɒtʃ/", bn:"দেখা (ভিডিও/টিভি)", pos:"verb", cat:"Verbs", ex:"We watch TV at night.", exBn:"আমরা রাতে টিভি দেখি।"},

  // --- Nature & weather ---
  {en:"rain", ph:"/reɪn/", bn:"বৃষ্টি", pos:"noun", cat:"Nature", ex:"The rain stopped at noon.", exBn:"দুপুরে বৃষ্টি থামলো।"},
  {en:"sun", ph:"/sʌn/", bn:"সূর্য", pos:"noun", cat:"Nature", ex:"The sun rises in the east.", exBn:"সূর্য পূর্ব দিগন্তে ওঠে।"},
  {en:"moon", ph:"/muːn/", bn:"চাঁদ", pos:"noun", cat:"Nature", ex:"The moon looks beautiful tonight.", exBn:"আজ রাতে চাঁদ সুন্দর লাগছে।"},
  {en:"sky", ph:"/skaɪ/", bn:"আকাশ", pos:"noun", cat:"Nature", ex:"The sky is clear today.", exBn:"আজ আকাশ পরিষ্কার।"},
  {en:"tree", ph:"/triː/", bn:"গাছ", pos:"noun", cat:"Nature", ex:"This tree is very old.", exBn:"এই গাছটা খুব পুরনো।"},
  {en:"river", ph:"/ˈrɪvər/", bn:"নদী", pos:"noun", cat:"Nature", ex:"The river flows fast.", exBn:"নদীটা দ্রুত বয়ে যায়।"},
  {en:"sea", ph:"/siː/", bn:"সমুদ্র", pos:"noun", cat:"Nature", ex:"We visited the sea last year.", exBn:"গত বছর আমরা সমুদ্রে গিয়েছিলাম।"},
  {en:"weather", ph:"/ˈweðər/", bn:"আবহাওয়া", pos:"noun", cat:"Nature", ex:"The weather is nice today.", exBn:"আজ আবহাওয়া সুন্দর।"},
  {en:"cold", ph:"/koʊld/", bn:"ঠান্ডা", pos:"adjective", cat:"Nature", ex:"Winter is very cold here.", exBn:"এখানে শীত খুব ঠান্ডা।"},
  {en:"hot", ph:"/hɒt/", bn:"গরম", pos:"adjective", cat:"Nature", ex:"Today is very hot.", exBn:"আজ খুব গরম।"},

  // --- Technology ---
  {en:"phone", ph:"/foʊn/", bn:"ফোন / মোবাইল", pos:"noun", cat:"Technology", ex:"My phone battery is low.", exBn:"আমার ফোনের ব্যাটারি কম।"},
  {en:"computer", ph:"/kəmˈpjuːtər/", bn:"কম্পিউটার", pos:"noun", cat:"Technology", ex:"I work on a computer.", exBn:"আমি কম্পিউটারে কাজ করি।"},
  {en:"internet", ph:"/ˈɪntərnet/", bn:"ইন্টারনেট", pos:"noun", cat:"Technology", ex:"The internet is slow today.", exBn:"আজ ইন্টারনেট ধীর।"},
  {en:"message", ph:"/ˈmesɪdʒ/", bn:"বার্তা / মেসেজ", pos:"noun", cat:"Technology", ex:"I sent you a message.", exBn:"আমি তোমাকে একটা মেসেজ পাঠিয়েছি।"},
  {en:"email", ph:"/ˈiːmeɪl/", bn:"ইমেইল", pos:"noun", cat:"Technology", ex:"Check your email please.", exBn:"অনুগ্রহ করে তোমার ইমেইল চেক করো।"},
  {en:"photo", ph:"/ˈfoʊtoʊ/", bn:"ছবি", pos:"noun", cat:"Technology", ex:"Take a photo of us.", exBn:"আমাদের একটা ছবি তোলো।"},
  {en:"video", ph:"/ˈvɪdioʊ/", bn:"ভিডিও", pos:"noun", cat:"Technology", ex:"This video went viral.", exBn:"ভিডিওটা ভাইরাল হয়ে গেছে।"},
  {en:"website", ph:"/ˈwebsaɪt/", bn:"ওয়েবসাইট", pos:"noun", cat:"Technology", ex:"This website is helpful.", exBn:"এই ওয়েবসাইটটা সাহায্য করে।"},

  // --- Advanced ---
  {en:"achieve", ph:"/əˈtʃiːv/", bn:"অর্জন করা", pos:"verb", cat:"Advanced", ex:"You can achieve your dream.", exBn:"তুমি তোমার স্বপ্ন অর্জন করতে পারো।"},
  {en:"confident", ph:"/ˈkɒnfɪdənt/", bn:"আত্মবিশ্বাসী", pos:"adjective", cat:"Advanced", ex:"Be confident in the exam.", exBn:"পরীক্ষায় আত্মবিশ্বাসী হও।"},
  {en:"decision", ph:"/dɪˈsɪʒən/", bn:"সিদ্ধান্ত", pos:"noun", cat:"Advanced", ex:"It was a hard decision.", exBn:"এটা কঠিন একটা সিদ্ধান্ত ছিল।"},
  {en:"opportunity", ph:"/ˌɒpərˈtuːnəti/", bn:"সুযোগ", pos:"noun", cat:"Advanced", ex:"This is a great opportunity.", exBn:"এটা একটা দারুণ সুযোগ।"},
  {en:"success", ph:"/səkˈses/", bn:"সফলতা", pos:"noun", cat:"Advanced", ex:"Success needs hard work.", exBn:"সফলতার জন্য কঠোর পরিশ্রম লাগে।"},
  {en:"failure", ph:"/ˈfeɪljər/", bn:"ব্যর্থতা", pos:"noun", cat:"Advanced", ex:"Failure teaches us a lot.", exBn:"ব্যর্থতা আমাদের অনেক কিছু শেখায়।"},
  {en:"improve", ph:"/ɪmˈpruːv/", bn:"উন্নতি করা", pos:"verb", cat:"Advanced", ex:"Practice improves your skill.", exBn:"অভ্যাস তোমার দক্ষতা বাড়ায়।"},
  {en:"knowledge", ph:"/ˈnɒlɪdʒ/", bn:"জ্ঞান", pos:"noun", cat:"Advanced", ex:"Books give us knowledge.", exBn:"বই আমাদের জ্ঞান দেয়।"},
  {en:"experience", ph:"/ɪkˈspɪriəns/", bn:"অভিজ্ঞতা", pos:"noun", cat:"Advanced", ex:"Tell us about your experience.", exBn:"আপনার অভিজ্ঞতা বলুন।"},
  {en:"responsible", ph:"/rɪˈspɒnsəbl/", bn:"দায়িত্বশীল", pos:"adjective", cat:"Advanced", ex:"He is a responsible person.", exBn:"সে একজন দায়িত্বশীল মানুষ।"},
  {en:"environment", ph:"/ɪnˈvaɪrənmənt/", bn:"পরিবেশ", pos:"noun", cat:"Advanced", ex:"We must protect the environment.", exBn:"আমাদের পরিবেশ রক্ষা করা উচিত।"},
  {en:"technology", ph:"/tekˈnɒlədʒi/", bn:"প্রযুক্তি", pos:"noun", cat:"Advanced", ex:"Technology is changing fast.", exBn:"প্রযুক্তি দ্রুত বদলাচ্ছে।"},
  {en:"communicate", ph:"/kəˈmjuːnɪkeɪt/", bn:"যোগাযোগ করা", pos:"verb", cat:"Advanced", ex:"We communicate in English.", exBn:"আমরা ইংরেজিতে যোগাযোগ করি।"},
  {en:"necessary", ph:"/ˈnesəseri/", bn:"প্রয়োজনীয়", pos:"adjective", cat:"Advanced", ex:"Sleep is necessary for health.", exBn:"স্বাস্থ্যের জন্য ঘুম প্রয়োজনীয়।"},
  {en:"important", ph:"/ɪmˈpɔːrtnt/", bn:"গুরুত্বপূর্ণ", pos:"adjective", cat:"Advanced", ex:"Health is important.", exBn:"স্বাস্থ্য গুরুত্বপূর্ণ।"}
];

// ------------------------- SHORTCUTS -------------------------
const DEFAULT_SHORTCUTS = [
  {en:"I'm going to...", bn:"আমি যাচ্ছি... / আমি ... করতে যাচ্ছি", tip:"\"I'm going to eat\" = আমি খেতে যাচ্ছি। পরিকল্পনা বোঝাতে ব্যবহার হয়।", cat:"Daily"},
  {en:"I gotta...", bn:"আমাকে ... করতেই হবে (গোটা = got to)", tip:"\"I gotta go\" = আমাকে যেতে হবে। বন্ধুদের সাথে কথা বলার সময়।", cat:"Daily"},
  {en:"Kinda...", bn:"একটু / মোটামুটি (kinda = kind of)", tip:"\"It's kinda cold\" = একটু ঠান্ডা।", cat:"Daily"},
  {en:"Lemme...", bn:"আমাকে দাও / দিতে দাও (lemme = let me)", tip:"\"Lemme see\" = দেখতে দাও।", cat:"Daily"},
  {en:"Wanna...?", bn:"করতে চাও? (wanna = want to)", tip:"\"Wanna go out?\" = বের হতে চাও?", cat:"Daily"},
  {en:"Dunno", bn:"জানি না (dunno = don't know)", tip:"\"I dunno\" = জানি না।", cat:"Daily"},
  {en:"Gimme...", bn:"আমাকে দাও (gimme = give me)", tip:"\"Gimme a minute\" = এক মিনিট দাও।", cat:"Daily"},
  {en:"Outta...", bn:"বাইরে থেকে / শেষ (outta = out of)", tip:"\"Get outta here!\" = এখান থেকে বের হও!", cat:"Daily"},
  {en:"Gotta bounce", bn:"তাহলে যাই / ছাড়ছি", tip:"বন্ধুত্বপূর্ণ বিদায়। \"It's late, gotta bounce!\"", cat:"Slang"},
  {en:"Hang out", bn:"অলস সময় কাটানো / ঘুরে বেড়ানো", tip:"\"Let's hang out this weekend\" = চলো এই সপ্তাহান্তে ঘুরে আসি।", cat:"Phrases"},
  {en:"No worries", bn:"কোনো সমস্যা নেই / ঠিক আছে", tip:"কাউকে sorry বললে \"No worries!\" দিয়ে উত্তর দিতে পারেন।", cat:"Phrases"},
  {en:"What's up?", bn:"কী অবস্থা? / কী খবর?", tip:"বন্ধুদের জন্য hello-র মতো। উত্তর: \"Not much!\"", cat:"Phrases"},
  {en:"Sounds good", bn:"ঠিক আছে / ভালো শোনাচ্ছে", tip:"প্রস্তাব মেনে নেওয়ার সহজ উপায়।", cat:"Phrases"},
  {en:"I'm on it", bn:"আমি কাজটা শুরু করে দিয়েছি", tip:"কাজ নিতে রাজি হওয়ার জন্য।", cat:"Work"},
  {en:"Let me know", bn:"আমাকে জানাবেন", tip:"\"Let me know if you need help.\" = দরকার হলে জানাবেন।", cat:"Work"},
  {en:"By the way (BTW)", bn:"যাইহোক / কথার মাঝে", tip:"নতুন কোনো কথা শুরু করতে।", cat:"Work"},
  {en:"ASAP (as soon as possible)", bn:"যত তাড়াতাড়ি সম্ভব", tip:"\"Send it ASAP\" = তাড়াতাড়ি পাঠাও।", cat:"Work"},
  {en:"Deal with it", bn:"সামলে নেওয়া", tip:"\"I'll deal with it\" = আমি সামলে নেবো।", cat:"Work"}
];

// ------------------------- LESSONS -------------------------
// Structure: {id, level, title, intro, words:[{en, bn}], examples:[{en, bn}], quiz:[{q, opts, a}]}
const DEFAULT_LESSONS = [
  // ===== LEARNING PATH (পূর্ণাঙ্গ A-Z কোর্স) =====
  {id:"b1", level:"beginner", cat:"speaking", title:"পরিচয় — নিজের কথা বলা",
   intro:"সবার প্রথম কাজ নিজেকে পরিচয় করিয়ে দেওয়া শেখা। এই ক্লাস শেষে আপনি ইংরেজিতে নিজের নাম, বয়স আর কাজ বলতে পারবেন।",
   words:[{en:"name", bn:"নাম"},{en:"age", bn:"বয়স"},{en:"live", bn:"থাকা"},{en:"student", bn:"ছাত্র"},{en:"job", bn:"চাকরি"}],
   rules:[
     {en:"I am [name].", bn:"আমি [নাম]। — যেমন: I am Rahim."},
     {en:"I am [number] years old.", bn:"আমি [সংখ্যা] বছরের। — I am 20 years old."},
     {en:"I live in [place].", bn:"আমি [জায়গায়] থাকি। — I live in Dhaka."},
     {en:"I am a [job/student].", bn:"আমি একজন [পেশা/ছাত্র]। — I am a student."}
   ],
   structure:{title:"🧱 এই বাক্যের গঠন", points:[
     {pattern:"I am + নাম", bn:"নিজের পরিচয় দিতে"},
     {pattern:"I am + সংখ্যা + years old", bn:"বয়স বলতে"},
     {pattern:"I live in + জায়গা", bn:"কোথায় থাকেন"}
   ]},
   quiz:[
     {q:"\"I am a student\" এর বাংলা কী?", opts:["আমি একজন ছাত্র।","আমি পড়া শুনি।","আমি স্কুলে যাই।"], a:0},
     {q:"\"আমি ঢাকায় থাকি\" — ইংরেজি কোনটি?", opts:["I go to Dhaka.","I live in Dhaka.","I like Dhaka."], a:1},
     {q:"বয়স বলতে কোনটি সঠিক?", opts:["I have 20 years.","I am 20 years old.","My age goes 20."], a:1}
   ]},
  {id:"b2", level:"beginner", cat:"speaking", title:"অভিবাদন — দৈনন্দিন কথাসাপ্তাহিক",
   intro:"Hello, Hi, Good morning — এই ক্লাসে শিখবেন কীভাবে বিভিন্ন সময়ে মানুষকে অভিবাদন জানাবেন এবং উত্তর দেবেন।",
   words:[{en:"greet", bn:"অভিবাদন জানানো"},{en:"morning", bn:"সকাল"},{en:"afternoon", bn:"দুপুর"},{en:"evening", bn:"সন্ধ্যা"},{en:"fine", bn:"ভালো"}],
   rules:[
     {en:"Good morning (সকাল), Good afternoon (দুপুর), Good evening (সন্ধ্যা)", bn:"সময় অনুযায়ী অভিবাদন বদলায়। রাতে ঘুমানোর আগে: Good night।"},
     {en:"How are you? — I'm fine, thank you.", bn:"কেমন আছো? — আমি ভালো, ধন্যবাদ। এটাই সবচেয়ে সাধারণ উত্তর।"},
     {en:"Nice to meet you!", bn:"প্রথম পরিচয়ে বলুন। উত্তর দিন: Nice to meet you too!"}
   ],
   structure:{title:"🧱 সময় অনুযায়ী অভিবাদনের সূত্র", points:[
     {pattern:"Good + morning/afternoon/evening", bn:"সময় নির্দেশ করে"},
     {pattern:"How are you? → I'm fine", bn:"কেমন আছেন জিজ্ঞেস ও উত্তর"}
   ]},
   quiz:[
     {q:"সকালে কাউকে দেখে কী বলবেন?", opts:["Good night","Good morning","Good bye"], a:1},
     {q:"\"How are you?\" এর উত্তর কোনটি?", opts:["I'm fine, thank you.","I am 20.","Yes, please."], a:0},
     {q:"রাতে ঘুমানোর আগে কী বলে?", opts:["Good evening","Good night","Good morning"], a:1}
   ]},
  {id:"b3", level:"beginner", cat:"basicwords", title:"পরিবার ও আত্মীয়",
   intro:"পরিবারের সদস্যদের ইংরেজি নাম আর তাদের নিয়ে ছোট ছোট বাক্য শিখুন।",
   words:[{en:"family", bn:"পরিবার"},{en:"parents", bn:"বাবা-মা"},{en:"brother", bn:"ভাই"},{en:"sister", bn:"বোন"},{en:"son", bn:"ছেলে"},{en:"daughter", bn:"মেয়ে"}],
   rules:[
     {en:"I have two brothers and one sister.", bn:"আমার দুই ভাই আর এক বোন আছে।"},
     {en:"This is my father. He is a farmer.", bn:"ইনি আমার বাবা। তিনি কৃষক।"},
     {en:"My family is small/big.", bn:"আমার পরিবার ছোট/বড়।"}
   ],
   structure:{title:"🧱 পরিবার বর্ণনার সূত্র", points:[
     {pattern:"I have + সংখ্যা + brother/sister", bn:"কতজন ভাই-বোন"},
     {pattern:"This is my + সদস্য", bn:"কাউকে পরিচয় করানোর সময়"}
   ]},
   quiz:[
     {q:"\"parents\" মানে কী?", opts:["পরিবার","বাবা-মা","আত্মীয়"], a:1},
     {q:"\"আমার এক বোন আছে\" — কোনটি সঠিক?", opts:["I am one sister.","I have one sister.","I with one sister."], a:1},
     {q:"daughter কাকে বলে?", opts:["ছেলে সন্তান","মেয়ে সন্তান","নাতনি"], a:1}
   ]},
  {id:"b4", level:"beginner", cat:"speaking", title:"সংখ্যা ও দাম কেনাকাটা",
   intro:"১ থেকে ১০০ পর্যন্ত সংখ্যা আর দোকানে দাম জিজ্ঞেস করার বাক্য শিখুন।",
   words:[{en:"price", bn:"দাম"},{en:"cost", bn:"মূল্য (হওয়া)"},{en:"buy", bn:"কেনা"},{en:"cheap", bn:"সস্তা"},{en:"expensive", bn:"দামি"}],
   rules:[
     {en:"How much is this?", bn:"এটার দাম কত? — কেনাকাটার সবচেয়ে দরকারি বাক্য!"},
     {en:"It costs 200 taka.", bn:"এটার দাম ২০০ টাকা।"},
     {en:"That's too expensive.", bn:"এটা তো খুব দামি।"}
   ],
   structure:{title:"🧱 দাম জানতে চাওয়ার সূত্র", points:[
     {pattern:"How much + is + this/that", bn:"দাম জানতে"},
     {pattern:"It costs + দাম + taka/dollar", bn:"দাম বলতে"}
   ]},
   quiz:[
     {q:"দাম জানতে চাইলে কী বলবেন?", opts:["What is this?","How much is this?","Where is this?"], a:1},
     {q:"\"cheap\" এর অর্থ?", opts:["দামি","সস্তা","ভালো"], a:1},
     {q:"\"It costs 50 taka\" মানে?", opts:["এটা ৫০ টাকায় বিক্রি হয়","এটার দাম ৫০ টাকা","৫০ টাকা দিয়েছি"], a:1}
   ]},
  {id:"b5", level:"beginner", cat:"speaking", title:"খাবার ও রেস্টুরেন্ট",
   intro:"খাবারের নাম আর রেস্টুরেন্টে অর্ডার করার বাক্য শিখুন — I'd like... থেকে The bill, please পর্যন্ত।",
   words:[{en:"order", bn:"অর্ডার করা"},{en:"menu", bn:"মেনু"},{en:"bill", bn:"বিল"},{en:"tasty", bn:"সুস্বাদু"},{en:"hungry", bn:"ক্ষুধার্ত"}],
   rules:[
     {en:"I'd like a chicken burger, please.", bn:"আমি একটা চিকেন বার্গার নিতে চাই। (I'd like = আমি চাই, ভদ্র উপায়)"},
     {en:"Can I have the menu?", bn:"মেনুটা পাবো?"},
     {en:"The bill, please.", bn:"বিলটা দিন, প্লিজ।"}
   ],
   structure:{title:"🧱 রেস্টুরেন্টে অর্ডারের সূত্র", points:[
     {pattern:"I'd like + খাবার + please", bn:"ভদ্রভাবে চাওয়া"},
     {pattern:"Can I have + জিনিস", bn:"কিছু চাওয়া"}
   ]},
   quiz:[
     {q:"অর্ডার দিতে কোনটি সবচেয়ে ভদ্র?", opts:["Give me food!","I'd like a coffee, please.","Food now."], a:1},
     {q:"\"bill\" মানে কী?", opts:["খাবার","বিল/হিসাব","টিপস"], a:1},
     {q:"খিদা পেলে কী বলবেন?", opts:["I am hungry.","I am thirsty.","I am tired."], a:0}
   ]},

  // ===== GRAMMAR =====
  {id:"g1", level:"inter", cat:"grammar", title:"Subject + Verb + Object — বাক্যের কংক্রিট",
   intro:"ইংরেজিতে বাক্য বানানোর মূল সূত্র শিখুন — Subject কে, Verb কাজ, Object কার উপর কাজ হচ্ছে। এটা শিখলেই ৮০% বাক্য বানাতে পারবেন।",
   words:[{en:"subject", bn:"কর্তা/সাবজেক্ট"},{en:"verb", bn:"ক্রিয়া/ভার্ব"},{en:"object", bn:"অবজেক্ট"},{en:"sentence", bn:"বাক্য"},{en:"make", bn:"বানানো"}],
   rules:[
     {en:"I + eat + rice.", bn:"আমি + খাই + ভাত। Subject(I) + Verb(eat) + Object(rice)"},
     {en:"She + reads + a book.", bn:"সে + পড়ে + একটা বই।"},
     {en:"We + play + cricket.", bn:"আমরা + খেলি + ক্রিকেট।"}
   ],
   structure:{title:"🧱 বাক্য গঠনের ৩ ধরনের সূত্র", points:[
     {pattern:"Sub + Verb (কাজ নেই)", bn:"I work. She sleeps."},
     {pattern:"Sub + Verb + Object", bn:"I eat rice. He plays football."},
     {pattern:"Sub + Verb + Object + Extra", bn:"I eat rice at home. She reads in the morning."}
   ]},
   quiz:[
     {q:"\"I eat rice\" — এখানে 'rice' কোন অংশ?", opts:["Subject","Verb","Object"], a:2},
     {q:"\"She plays\" — পূর্ণ বাক্য করতে কী লাগবে?", opts:["Object না লাগলেও চলে","Object দিতেই হবে","Verb লাগবে না"], a:0},
     {q:"কোনটি সঠিক বাক্য?", opts:["Rice I eat.","I eat rice.","Eat I rice."], a:1}
   ]},
  {id:"g2", level:"inter", cat:"grammar", title:"Be ভার্ব — am/is/are/was/were",
   intro:"Be ভার্ব দিয়ে বর্ণনা ও অবস্থান বলা যায় — I am a student. She is happy. এটা ছাড়া কথা বলা যায় না।",
   words:[{en:"be", bn:"হওয়া (am/is/are)"},{en:"was/were", bn:"ছিলাম/ছিল"},{en:"is", bn:"হয় (singular)"},{en:"are", bn:"হয় (plural/you)"},{en:"am", bn:"হই (I)"}],
   rules:[
     {en:"I am happy.", bn:"আমি খুশি।"},
     {en:"She is a teacher.", bn:"সে একজন শিক্ষক।"},
     {en:"They are friends.", bn:"তারা বন্ধু।"},
     {en:"He was tired yesterday.", bn:"সে গতকাল ক্লান্ত ছিল।"}
   ],
   structure:{title:"🧱 am/is/are কখন কোনটা", points:[
     {pattern:"I → am", bn:"I am a student."},
     {pattern:"He/She/It → is", bn:"She is happy."},
     {pattern:"You/We/They → are", bn:"You are welcome."},
     {pattern:"Past: I/He/She → was | You/We/They → were", bn:"I was tired. They were busy."}
   ]},
   quiz:[
     {q:"\"He ___ a doctor\" — সঠিকটি?", opts:["am","is","are"], a:1},
     {q:"\"They ___ friends\" — কোনটি?", opts:["is","am","are"], a:2},
     {q:"অতীতে \"I ___ at home\" — কোনটি?", opts:["am","was","were"], a:1}
   ]},
  {id:"g3", level:"inter", cat:"grammar", title:"নামাংকরণ — Noun & Pronoun",
   intro:"নামের শব্দ (Rahim, Dhaka, water) আর সর্বনাম (I, you, he, they) — কারী নিয়ে বাক্য শুরু হয়।",
   words:[{en:"noun", bn:"নামাংকরণ — মানুষ, জায়গা, জিনিস"},{en:"pronoun", bn:"সর্বনাম — I, you, he"},{en:"this", bn:"এটা"},{en:"that", bn:"ওটা"},{en:"these/those", bn:"এগুলো/ওগুলো"}],
   rules:[
     {en:"Noun: boy, Dhaka, water, book", bn:"যেকোনো নাম — মানুষ, জায়গা, জিনিস, ভাব।"},
     {en:"Pronoun: I, you, he, she, it, we, they", bn:"নামের বদলে বারবার বলা এড়ানোর জন্য।"},
     {en:"This book is mine. That car is new.", bn:"এটা (this) আমার, ওটা (that) নতুন।"}
   ],
   structure:{title:"🧱 নাম vs সর্বনামের ব্যবহার", points:[
     {pattern:"Rahim is a boy. He is good.", bn:"Rahim (noun) → he (pronoun) দিয়ে বারবার নাম বলা এড়ানো"},
     {pattern:"This/That + is + বস্তু", bn:"কাছের জিনিস this, দূরের that"}
   ]},
   quiz:[
     {q:"Noun কোনটি?", opts:["he","run","book"], a:2},
     {q:"Pronoun কোনটি?", opts:["Dhaka","she","water"], a:1},
     {q:"\"These ___ my friends\" — কোনটি?", opts:["is","are","am"], a:1}
   ]},
  {id:"g4", level:"inter", cat:"grammar", title:"বর্ণনা — Adjective",
   intro:"বড়, ছোট, সুন্দর, খারাপ — কিছুকে বর্ণনা করতে adjective ব্যবহার হয়।",
   words:[{en:"adjective", bn:"বর্ণনা — big, small, good"},{en:"tall", bn:"লম্বা"},{en:"short", bn:"খাটো"},{en:"new", bn:"নতুন"},{en:"old", bn:"পুরনো"}],
   rules:[
     {en:"Adjective + noun: a tall boy, a new phone", bn:"বর্ণনা আগে বসে — a tall boy।"},
     {en:"Noun + is/are + adjective: He is tall.", bn:"সে লম্বা — বর্ণনা পরে বসে।"}
   ],
   structure:{title:"🧱 বর্ণনার দুই রূপ", points:[
     {pattern:"a/an + adjective + noun", bn:"একটা লম্বা ছেলে — a tall boy"},
     {pattern:"subject + is/are + adjective", bn:"সে লম্বা — He is tall"}
   ]},
   quiz:[
     {q:"\"লম্বা ছেলে\" কীভাবে বলবেন?", opts:["boy tall","tall boy","a boy tall"], a:1},
     {q:"\"She is ___\" — বাংলা 'সে খুশি'?", opts:["happys","happy","happying"], a:1},
     {q:"কোনটি সঠিক?", opts:["a new phone","a phone new","new a phone"], a:0}
   ]},

  // ===== TENSES =====
  {id:"t1", level:"inter", cat:"tense", title:"Present Simple — নিয়মিত কাজ",
   intro:"প্রতিদিন যা করেন — I go, She eats, We play. সত্য/অভ্যাস/তত্ত্ব বোঝাতে present simple।",
   words:[{en:"every day", bn:"প্রতিদিন"},{en:"always", bn:"সবসময়"},{en:"usually", bn:"সাধারণত"},{en:"sometimes", bn:"মাঝে মাঝে"},{en:"never", bn:"কখনো না"}],
   rules:[
     {en:"I go to school every day.", bn:"আমি প্রতিদিন স্কুলে যাই।"},
     {en:"She plays cricket.", bn:"সে ক্রিকেট খেলে। (She/He এর সাথে verb + s/es)"},
     {en:"They don't eat fish.", bn:"তারা মাছ খায় না। (don't দিয়ে না-বোধক)"}
   ],
   structure:{title:"🧱 Present Simple সূত্র", points:[
     {pattern:"I/We/They + verb1 | He/She + verb1 + s/es", bn:"আমি/আমরা/তারা যাই/খাই | সে যায়/খায়"},
     {pattern:"Do/Does + subject + verb1?", bn:"প্রশ্ন করতে — Do you go? Does she play?"},
     {pattern:"don't/doesn't + verb1", bn:"না-বোধক — I don't go. She doesn't play."}
   ]},
   quiz:[
     {q:"\"সে পড়ে\" — কোনটি?", opts:["She read.","She reads.","She reading."], a:1},
     {q:"না-বোধক কোনটি?", opts:["I don't go.","I doesn't go.","I no go."], a:0},
     {q:"প্রশ্ন করতে?", opts:["You go?","Do you go?","Goes you?"], a:1}
   ]},
  {id:"t2", level:"inter", cat:"tense", title:"Past Simple — অতীতের কাজ",
   intro:"গতকাল, গত সপ্তাহে কী করেছিলেন — I went, She saw, They played. Verb-এর পুরনো রূপ দিয়ে।",
   words:[{en:"went (go→went)", bn:"গিয়েছিলাম"},{en:"ate (eat→ate)", bn:"খেয়েছিলাম"},{en:"saw (see→saw)", bn:"দেখেছিলাম"},{en:"did (do→did)", bn:"করেছিলাম"},{en:"yesterday", bn:"গতকাল"}],
   rules:[
     {en:"I went to the market yesterday.", bn:"আমি গতকাল বাজারে গিয়েছিলাম।"},
     {en:"Did you watch the match?", bn:"তুমি কি ম্যাচটা দেখেছিলে?"},
     {en:"She didn't come yesterday.", bn:"সে গতকাল আসেনি। (didn't + verb1)"}
   ],
   structure:{title:"🧱 Past Simple সূত্র", points:[
     {pattern:"subject + verb2 (past)", bn:"I went, She ate, They played"},
     {pattern:"Did + subject + verb1?", bn:"প্রশ্ন — Did you go? (verb2 নয়)"},
     {pattern:"didn't + verb1", bn:"না-বোধক — I didn't go."}
   ]},
   quiz:[
     {q:"\"আমি গতকাল সিনেমা দেখেছি\" — কোনটি?", opts:["I watch a movie yesterday.","I watched a movie yesterday.","I watching a movie yesterday."], a:1},
     {q:"go-এর past form কোনটি?", opts:["goed","gone","went"], a:2},
     {q:"প্রশ্ন করতে কোনটি সঠিক?", opts:["Did you went?","Did you go?","Do you went?"], a:1}
   ]},
  {id:"t3", level:"inter", cat:"tense", title:"Future — will & going to",
   intro:"আগামীকাল কী করবেন — I will go, I'm going to study. পরিকল্পনা আর সিদ্ধান্ত দুটোই বোঝায়।",
   words:[{en:"will", bn:"হবে (ভবিষ্যৎ)"},{en:"going to", bn:"করতে যাচ্ছি"},{en:"plan", bn:"পরিকল্পনা"},{en:"next week", bn:"পরের সপ্তাহ"},{en:"soon", bn:"শীঘ্রই"}],
   rules:[
     {en:"I will call you tomorrow.", bn:"আমি আগামীকাল তোমাকে ফোন করবো।"},
     {en:"I'm going to visit Cox's Bazar next week.", bn:"পরের সপ্তাহে আমি কক্সবাজার যাবো। (going to = আগে থেকে পরিকল্পনা)"},
     {en:"We'll see later.", bn:"পরে দেখা যাবে।"}
   ],
   structure:{title:"🧱 will vs going to", points:[
     {pattern:"will + verb1", bn:"হঠাৎ সিদ্ধান্ত — I will go now."},
     {pattern:"am/is/are going to + verb1", bn:"আগের পরিকল্পনা — I'm going to study."}
   ]},
   quiz:[
     {q:"আগের পরিকল্পনা বোঝাতে?", opts:["will","going to","was to"], a:1},
     {q:"\"আমি কাল যাবো\" — সঠিক বাক্য?", opts:["I will go tomorrow.","I go tomorrow.","I went tomorrow."], a:0},
     {q:"\"We'll\" এর পূর্ণরূপ?", opts:["We well","We will","We shall not"], a:1}
   ]},
  {id:"t4", level:"adv", cat:"tense", title:"Present Perfect — জীবনের অভিজ্ঞতা",
   intro:"I have done it! — সবে শেষ হওয়া বা জীবনে কখনো করা কাজ। have/has + verb3।",
   words:[{en:"have done", bn:"করেছি"},{en:"already", bn:"ইতিমধ্যে"},{en:"yet", bn:"এখনো"},{en:"ever", bn:"কখনো (জীবনে)"},{en:"never", bn:"কখনোই না"}],
   rules:[
     {en:"I have finished my homework.", bn:"আমি আমার হোমওয়ার্ক শেষ করেছি।"},
     {en:"Have you ever been to London?", bn:"তুমি কি কখনো লন্ডন গিয়েছো?"},
     {en:"She has already eaten.", bn:"সে ইতিমধ্যে খেয়ে ফেলেছে।"}
   ],
   structure:{title:"🧱 Present Perfect সূত্র", points:[
     {pattern:"have/has + verb3 (done/gone/eaten)", bn:"I have gone. She has eaten."},
     {pattern:"ever = কখনো (প্রশ্নে), never = কখনোই না", bn:"Have you ever been? I have never gone."},
     {pattern:"already = ইতিমধ্যে, yet = এখনো (প্রশ্ন/না)", bn:"I have already finished. Have you finished yet?"}
   ]},
   quiz:[
     {q:"সঠিক বাক্য কোনটি?", opts:["I have went there.","I have gone there.","I has gone there."], a:1},
     {q:"\"আমি কখনোই জাপান যাইনি\"?", opts:["I never went Japan.","I have never been to Japan.","I did never go Japan."], a:1},
     {q:"already এর ব্যবহার কোনটি?", opts:["She has already left.","She already has leave.","She already left has."], a:0}
   ]},
  {id:"t5", level:"adv", cat:"tense", title:"Present Continuous — এই মুহূর্তে চলমান",
   intro:"আমি এখন পড়ছি — I am studying. এখন যা চলছে তা বলতে ing দিয়ে।",
   words:[{en:"now", bn:"এখন"},{en:"right now", bn:"এই মুহূর্তে"},{en:"listening", bn:"শুনছি"},{en:"watching", bn:"দেখছি"},{en:"studying", bn:"পড়ছি"}],
   rules:[
     {en:"I am studying now.", bn:"আমি এখন পড়ছি।"},
     {en:"She is cooking.", bn:"সে রাঁধছে।"},
     {en:"They are playing.", bn:"তারা খেলছে।"}
   ],
   structure:{title:"🧱 Continuous সূত্র", points:[
     {pattern:"am/is/are + verb + ing", bn:"I am reading. She is cooking. They are playing."},
     {pattern:"Am/Is/Are + subject + verb-ing?", bn:"প্রশ্ন — Is she cooking?"}
   ]},
   quiz:[
     {q:"\"সে খাচ্ছে\" — কোনটি?", opts:["She is eating.","She eats.","She eat."], a:0},
     {q:"\"আমি এখন কাজ করছি\" — কোনটি?", opts:["I work now.","I am working now.","I am work now."], a:1},
     {q:"প্রশ্ন কোনটি?", opts:["Is she cooking?","She is cooking?","Cooking she?"], a:0}
   ]},
  {id:"t6", level:"adv", cat:"tense", title:"Past Continuous — অতীতে চলমান ছিল",
   intro:"আমি গতকাল পড়ছিলাম — I was studying. কোনো সময়ে কাজ চলমান ছিল তা বোঝাতে।",
   words:[{en:"was", bn:"ছিলাম/ছিল"},{en:"were", bn:"ছিলেন/ছিল"},{en:"while", bn:"যখন"},{en:"at that time", bn:"সেই সময়"}],
   rules:[
     {en:"I was sleeping at 10 last night.", bn:"আমি গতকাল রাত ১০টায় ঘুমাচ্ছিলাম।"},
     {en:"They were playing when I arrived.", bn:"আমি পৌঁছানোর সময় তারা খেলছিল।"}
   ],
   structure:{title:"🧱 Past Continuous সূত্র", points:[
     {pattern:"was/were + verb-ing", bn:"I was reading. They were playing."},
     {pattern:"was/were + verb-ing + when + past simple", bn:"I was sleeping when he called."}
   ]},
   quiz:[
     {q:"\"আমি ঘুমাচ্ছিলাম\" — কোনটি?", opts:["I slept.","I was sleeping.","I sleep."], a:1},
     {q:"while এর সঠিক ব্যবহার?", opts:["I was sleeping while he came.","I was sleeping while he was coming.", "I slept while he came."], a:1}
   ]},

  // ===== SENTENCE MAKING =====
  {id:"s1", level:"beginner", cat:"sentence", title:"বাক্যের মূল কাঠামো — কীভাবে জোড়া লাগান",
   intro:"ইংরেজিতে বাক্য বানাতে মূলত ৩ টা জিনিস লাগে — কে (Subject), কী করছে (Verb), কাকে/কাকে নিয়ে (Object)। এই লেসনে শিখুন কীভাবে বাংলা থেকে ইংরেজিতে বাক্য বানাবেন।",
   words:[{en:"word order", bn:"শব্দের ক্রম"},{en:"make a sentence", bn:"বাক্য বানানো"},{en:"join", bn:"জোড়া দেওয়া"},{en:"correct", bn:"সঠিক"},{en:"wrong", bn:"ভুল"}],
   rules:[
     {en:"বাংলা: আমি ভাত খাই → ইংরেজি: I eat rice.", bn:"আমি = I, খাই = eat, ভাত = rice — ক্রম একই।"},
     {en:"বাংলা: সে পানি পান করে → ইংরেজি: She drinks water.", bn:"সে = She, পান করে = drinks (verb), পানি = water"},
     {en:"প্রশ্নে ক্রম বদলে যায়: You are → Are you?", bn:"Are you? = তুমি কি? সহজ প্রশ্ন।"}
   ],
   structure:{title:"🧱 বাংলা থেকে ইংরেজিতে বাক্য গঠনের চাবিকাঠি", points:[
     {pattern:"সাবজেক্ট আগে, ভার্ব মাঝে, অবজেক্ট শেষে", bn:"[কে] + [কী করে] + [কাকে] — I + eat + rice"},
     {pattern:"না-বোধক: verb-এর আগে not/don't/doesn't", bn:"I don't eat rice. = আমি ভাত খাই না"},
     {pattern:"প্রশ্ন: verb-এর শুরুতে Aux (do/does/did/is/are)", bn:"Do you eat rice? = তুমি কি ভাত খাও?"}
   ]},
   quiz:[
     {q:"\"সে পড়ে\" বলতে কী হবে?", opts:["She read.","She reads.","She reading."], a:1},
     {q:"\"আমি স্কুলে যাই না\" — কোনটি?", opts:["I not go to school.","I don't go to school.","I no go school."], a:1},
     {q:"প্রশ্ন করতে কোনটি সঠিক?", opts:["You go school?","Do you go to school?","Goes you school?"], a:1}
   ]},
  {id:"s2", level:"inter", cat:"sentence", title:"প্রশ্নের সব রূপ — কীভাবে জিজ্ঞেস করবেন",
   intro:"কে, কী, কোথায়, কখন, কীভাবে — প্রশ্ন করতে Who/What/Where/When/How। পাশাপাশি Yes/No প্রশ্ন।",
   words:[{en:"who", bn:"কে"},{en:"what", bn:"কী"},{en:"where", bn:"কোথায়"},{en:"when", bn:"কখন"},{en:"how", bn:"কীভাবে"},{en:"why", bn:"কেন"}],
   rules:[
     {en:"What is your name?", bn:"তোমার নাম কী?"},
     {en:"Where do you live?", bn:"তুমি কোথায় থাকো?"},
     {en:"How old are you?", bn:"তোমার বয়স কত?"},
     {en:"Do you like tea?", bn:"তুমি চা পছন্দ করো? (Yes/No)"}
   ],
   structure:{title:"🧱 প্রশ্নের ২ সূত্র", points:[
     {pattern:"WH-word + aux + sub + verb", bn:"Where do you live? = WH(Where) + do + you + live"},
     {pattern:"Aux + sub + verb?", bn:"Yes/No — Do you go? Is she happy? Have you eaten?"}
   ]},
   quiz:[
     {q:"\"কোথায় থাকো\" — কোনটি?", opts:["Where you live?","Where do you live?","Where does you live?"], a:1},
     {q:"\"তুমি কি ভাত খাও\" — কোনটি?", opts:["Do you eat rice?","Are you eat rice?","You eat rice?"], a:0},
     {q:"\"কখন\" ইংরেজি কোন শব্দে?", opts:["how","when","what"], a:1}
   ]},
  {id:"s3", level:"inter", cat:"sentence", title:"জটিল বাক্য — and, but, because, so",
   intro:"ছোট ছোট বাক্য জোড়া দিয়ে বড় বাক্য বানান — I was tired so I slept. এই লিঙ্কগুলো শিখলে কথা প্রবাহমান হবে।",
   words:[{en:"and", bn:"এবং"},{en:"but", bn:"কিন্তু"},{en:"because", bn:"কারণ"},{en:"so", bn:"তাই"},{en:"or", bn:"অথবা"}],
   rules:[
     {en:"I was tired, so I went to sleep.", bn:"আমি ক্লান্ত ছিলাম, তাই ঘুমাতে গিয়েছিলাম। (so = তাই)"},
     {en:"She is rich but honest.", bn:"সে ধনী কিন্তু সৎ। (but = বৈপরীত্য)"},
     {en:"I stayed home because it was raining.", bn:"আমি বাড়িতে ছিলাম কারণ বৃষ্টি হচ্ছিল। (because = কারণ)"}
   ],
   structure:{title:"🧱 জোড়া লাগানোর সূত্র", points:[
     {pattern:"and = এবং (যোগ)", bn:"I like tea and coffee."},
     {pattern:"but = কিন্তু (বৈপরীত্য)", bn:"He is poor but happy."},
     {pattern:"because = কারণ (কারণ)", bn:"I slept because I was tired."},
     {pattern:"so = তাই (ফল)", bn:"It was raining so I stayed."}
   ]},
   quiz:[
     {q:"কারণ বোঝাতে কোনটি?", opts:["so","but","because"], a:2},
     {q:"ফল/ফলাফল বোঝাতে?", opts:["because","so","and"], a:1},
     {q:"বৈপরীত্য বোঝাতে?", opts:["and","but","because"], a:1}
   ]},
  {id:"s4", level:"inter", cat:"sentence", title:"কীভাবে সঠিক বাক্য লিখবেন — Common Mistakes",
   intro:"সবচেয়ে বেশি যে ভুলগুলো নতুন শিক্ষার্থীরা করে — আজ সেগুলো শিখে নিন যাতে না-ভুলেন।",
   words:[{en:"mistake", bn:"ভুল"},{en:"correct", bn:"সঠিক"},{en:"wrong", bn:"ভুল"},{en:"grammar", bn:"ব্যাকরণ"}],
   rules:[
     {en:"❌ I am agree → ✅ I agree.", bn:"agree নিজেই verb — I am দিতে হয় না।"},
     {en:"❌ I didn't went → ✅ I didn't go.", bn:"didn't পরে verb-এর main form — went নয় go।"},
     {en:"❌ She have → ✅ She has.", bn:"She/He/It এর সাথে have হয় না — has হয়।"},
     {en:"❌ I am loving it → ✅ I love it.", bn:"love/like/want প্রভৃতি continuous হয় না — I love it।"}
   ],
   structure:{title:"🧱 সবচেয়ে বেশি ভুলের তালিকা", points:[
     {pattern:"didn't/don't/doesn't পরে verb1", bn:"I didn't went → I didn't go"},
     {pattern:"have হবে has (he/she/it)", bn:"She have → She has"},
     {pattern:"ইয়ে-বোধক continuous হয় না", bn:"I am loving → I love"},
     {pattern:"to be নেই action verb-এর সাথে", bn:"I am agree → I agree"}
   ]},
   quiz:[
     {q:"সঠিক বাক্য কোনটি?", opts:["I didn't went.","I didn't go.","I don't went."], a:1},
     {q:"কোনটি সঠিক?", opts:["She have a phone.","She has a phone.","She haves a phone."], a:1},
     {q:"কোনটি সঠিক?", opts:["I am loving it.","I love it.","I am love it."], a:1}
   ]},

  // ===== SPEAKING =====
  {id:"sp1", level:"inter", cat:"speaking", title:"দৈনন্দিন সংলাপ — সাধারণ প্রশ্নোত্তর",
   intro:"দৈনন্দিন যে ছোট ছোট প্রশ্ন-উত্তর হয় — What's up? How's it going? Where you from? এসবের উত্তর কীভাবে দেবেন শিখুন।",
   words:[{en:"how's it going", bn:"কেমন চলছে"},{en:"what's up", bn:"কী অবস্থা"},{en:"where are you from", bn:"তুমি কোথা থেকে"},{en:"see you", bn:"দেখা হবে"}],
   rules:[
     {en:"What's up? — Not much, just working.", bn:"কী অবস্থা? — বিশেষ কিছু না, কাজ করছি।"},
     {en:"How's it going? — Great! How about you?", bn:"কেমন চলছে? — ভালো! তুমি কেমন?"},
     {en:"Where are you from? — I'm from Dhaka.", bn:"তুমি কোথা থেকে? — আমি ঢাকা থেকে।"}
   ],
   structure:{title:"🧱 দৈনন্দিন প্রশ্নের উত্তর সূত্র", points:[
     {pattern:"I'm from + শহর", bn:"I'm from Dhaka/Rajshahi."},
     {pattern:"It's going well/okay/great", bn:"কেমন চলছে — ভালো/ঠিকঠাক/দারুণ"}
   ]},
   quiz:[
     {q:"\"What's up?\" এর সহজ উত্তর?", opts:["Nothing much.","I don't know.","Yes, please."], a:0},
     {q:"\"তুমি কোথা থেকে\" উত্তর?", opts:["I am Dhaka.","I'm from Dhaka.","I live Dhaka."], a:1}
   ]},
  {id:"sp2", level:"inter", cat:"speaking", title:"সাহায্য চাওয়া ও দেওয়া",
   intro:"Can you help me? Could you...? — কিছু চাওয়ার ভদ্র উপায় শিখুন।",
   words:[{en:"could", bn:"পারবেন (ভদ্র)"},{en:"would", bn:"করবেন (ভদ্র)"},{en:"please", bn:"দয়া করে"},{en:"mind", bn:"আপত্তি"}],
   rules:[
     {en:"Can you help me, please?", bn:"আমাকে একটু সাহায্য করবেন? (সাধারণ)"},
     {en:"Could you open the door, please?", bn:"দরজাটা খুলে দেবেন প্লিজ? (ভদ্র)"},
     {en:"Would you mind helping me?", bn:"একটু সাহায্য করবেন কি? (খুব ভদ্র)"}
   ],
   structure:{title:"🧱 ভদ্রভাবে চাওয়ার সূত্র", points:[
     {pattern:"Can you + verb1 + please", bn:"Can you come, please?"},
     {pattern:"Could you + verb1 + please", bn:"Could you help me, please?"},
     {pattern:"Would you mind + verb-ing", bn:"Would you mind helping me?"}
   ]},
   quiz:[
     {q:"সবচেয়ে ভদ্র প্রশ্ন কোনটি?", opts:["Help me!","Can you help me?","Would you mind helping me?"], a:2},
     {q:"\"দরজাটা খুলবেন\" ভদ্র করে?", opts:["Could you open the door?","You open door.","Open door please."], a:0}
   ]},
  {id:"sp3", level:"inter", cat:"speaking", title:"নির্দেশ দেওয়া ও অনুমতি নেওয়া",
   intro:"Go straight, turn left — রাস্তা দেখানো আর Can I use your phone? টাইপ অনুমতি চাওয়া শিখুন।",
   words:[{en:"turn left", bn:"বামে যান"},{en:"turn right", bn:"ডানে যান"},{en:"go straight", bn:"সোজা যান"},{en:"may I", bn:"পারবো কি (ভদ্র)"},{en:"let me", bn:"দিন"}],
   rules:[
     {en:"Go straight, then turn left.", bn:"সোজা যান, তারপর বামে যান।"},
     {en:"May I use your phone?", bn:"আপনার ফোনটা একটু ব্যবহার করতে পারবো? (ভদ্র)"},
     {en:"Let me help you.", bn:"আপনাকে সাহায্য করতে দিন।"}
   ],
   structure:{title:"🧱 নির্দেশনা ও অনুমতির সূত্র", points:[
     {pattern:"Go/Turn + left/right/straight", bn:"দিক নির্দেশ"},
     {pattern:"May I + verb1", bn:"May I come in? = ভেতরে আসতে পারবো?"},
     {pattern:"Let me + verb1", bn:"Let me help you. = আপনাকে সাহায্য করতে দিন"}
   ]},
   quiz:[
     {q:"\"ফোনটা ব্যবহার করতে পারি\" — ভদ্র করে?", opts:["Give me your phone.","May I use your phone?","I use your phone."], a:1},
     {q:"\"সোজা যান\" ইংরেজি কোনটি?", opts:["Go left","Go straight","Turn straight"], a:1}
   ]},

  // ===== WRITING =====
  {id:"w1", level:"inter", cat:"writing", title:"ইমেইল/চিঠি লেখা — ফরমাল ফরম্যাট",
   intro:"Dear Sir, I am writing to... — অফিসিয়াল ইমেইল কীভাবে লিখবেন শিখুন। চাকরির আবেদন থেকে কাস্টমার রিপোর্ট পর্যন্ত।",
   words:[{en:"dear", bn:"প্রিয়"},{en:"regarding", bn:"সংক্রান্ত"},{en:"request", bn:"অনুরোধ"},{en:"attached", bn:"সংযুক্ত"},{en:"regards", bn:"শুভেচ্ছা"}],
   rules:[
     {en:"Dear Sir/Madam, I am writing to apply for the position...", bn:"সম্ভাষণ দিয়ে শুরু — প্রাপককে শ্রদ্ধা জানান।"},
     {en:"Please find the document attached.", bn:"ডকুমেন্টটি সংযুক্ত করা হলো।"},
     {en:"I look forward to your reply. Best regards,", bn:"আপনার উত্তরের অপেক্ষায়। বিনীত,"}
   ],
   structure:{title:"🧱 ইমেইলের ফরম্যাট", points:[
     {pattern:"Dear [Sir/Madam],", bn:"সম্ভাষণ দিয়ে শুরু"},
     {pattern:"I am writing to + উদ্দেশ্য", bn:"I am writing to apply/inform/request"},
     {pattern:"Best regards / Sincerely,", bn:"শেষ বিনীততা"}
   ]},
   quiz:[
     {q:"ইমেইল শুরু করার ফরমাল উপায়?", opts:["Hey!","Dear Sir/Madam,","Yo, boss!"], a:1},
     {q:"ইমেইলের শেষ কীভাবে করবেন?", opts:["Bye bye!","Best regards,","That's all."], a:1}
   ]},
  {id:"w2", level:"adv", cat:"writing", title:"প্রেজেন্টেশন ও স্পিচ — পেশাদার বর্ণনা",
   intro:"First of all, I would like to say... — জনসমক্ষে বা মিটিংয়ে সুন্দরভাবে কথা শুরু, পয়েন্ট বোঝানো আর শেষ করার বাক্য।",
   words:[{en:"first of all", bn:"সর্বপ্রথম"},{en:"to sum up", bn:"সারসংক্ষেপে"},{en:"in conclusion", bn:"সিদ্ধান্তে"},{en:"thank you for listening", bn:"শোনার জন্য ধন্যবাদ"}],
   rules:[
     {en:"First of all, I would like to thank you all for coming.", bn:"সর্বপ্রথম, আপনাদের আসার জন্য ধন্যবাদ।"},
     {en:"There are three main points I want to discuss.", bn:"আমি তিনটি মূল বিষয় আলোচনা করতে চাই।"},
     {en:"In conclusion, we need to work harder. Thank you.", bn:"সিদ্ধান্তে বলা যায়, আমাদের আরও কঠোর কাজ করতে হবে। ধন্যবাদ।"}
   ],
   structure:{title:"🧱 স্পিচের গঠন", points:[
     {pattern:"First of all / To begin with", bn:"শুরুর পরিচয়"},
     {pattern:"First, Second, Finally", bn:"পয়েন্ট বোঝানোর ক্রম"},
     {pattern:"In conclusion / To sum up", bn:"শেষের সারসংক্ষেপ"}
   ]},
   quiz:[
     {q:"স্পিচ শুরু করার ভদ্র উপায়?", opts:["Listen everyone!","First of all, thank you for coming.","Now hear this!"], a:1},
     {q:"পয়েন্ট বোঝাতে কোনটি?", opts:["First, second, finally","One, two, three","Start, middle, end"], a:0}
   ]},

  // ===== ADVANCED / MISCELLANEOUS =====
  {id:"a1", level:"adv", cat:"advanced", title:"শর্তসাপেক্ষ বাক্য — Conditionals",
   intro:"If দিয়ে শর্ত: If I had money, I would travel. এই ক্লাসে শিখুন স্বপ্ন, সম্ভাবনা আর শর্ত বোঝানোর ইংরেজি।",
   words:[{en:"if", bn:"যদি"},{en:"would", bn:"হতো (শর্তসাপেক্ষ)"},{en:"could", bn:"পারতাম"},{en:"unless", bn:"যদি না"},{en:"chance", bn:"সুযোগ"}],
   rules:[
     {en:"If I had money, I would travel the world.", bn:"যদি আমার টাকা থাকত, আমি পৃথিবী ঘুরে বেড়াতাম। (স্বপ্ন/অসম্ভব শর্ত)"},
     {en:"If it rains, I will stay home.", bn:"যদি বৃষ্টি হয়, আমি বাড়িতে থাকবো। (সম্ভাব্য শর্ত)"},
     {en:"I would help you if I could.", bn:"পারলে তোমাকে সাহায্য করতাম।"}
   ],
   structure:{title:"🧱 শর্তের সূত্র", points:[
     {pattern:"If + sub + verb2, sub + would + verb1", bn:"If I had money, I would travel."},
     {pattern:"If + sub + verb1, sub + will + verb1", bn:"If it rains, I will stay."}
   ]},
   quiz:[
     {q:"সম্ভাব্য শর্ত কোনটি?", opts:["If I were you...","If it rains, I will stay.","If I had known..."], a:1},
     {q:"\"If I were you, I would study.\" মানে?", opts:["তুমি আমি হলে পড়তে","আমি তুমি হলে পড়তাম","তুমি আমার মতো পড়ো"], a:1},
     {q:"\"unless\" মানে?", opts:["যদি","যদি না","কারণ"], a:1}
   ]},
  {id:"a2", level:"adv", cat:"advanced", title:"Phrasal Verbs — আসল ইংরেজির চাবিকাঠি",
   intro:"give up, look after, put off — এই ছোট ছোট কম্বিনেশন শিখলে ইংরেজিতে নেটিভদের মতো কথা বলা সহজ হবে।",
   words:[{en:"give up", bn:"হাল ছাড়া"},{en:"look after", bn:"দেখাশোনা করা"},{en:"put off", bn:"পিছিয়ে দেওয়া"},{en:"find out", bn:"খুঁজে বের করা"},{en:"carry on", bn:"চালিয়ে যাওয়া"}],
   rules:[
     {en:"Never give up on your dreams.", bn:"কখনো তোমার স্বপ্ন ছেড়ো না।"},
     {en:"Can you look after my cat?", bn:"আমার বিড়ালটার দেখাশোনা করবেন?"},
     {en:"The meeting was put off until Friday.", bn:"মিটিং শুক্রবার পর্যন্ত পিছিয়ে দেওয়া হয়েছে।"}
   ],
   structure:{title:"🧱 প্রধান Phrasal Verbs", points:[
     {pattern:"give up = হাল ছাড়া", bn:"Never give up."},
     {pattern:"look after = দেখাশোনা", bn:"Look after your books."},
     {pattern:"put off = পিছিয়ে দেওয়া", bn:"Don't put off your study."}
   ]},
   quiz:[
     {q:"\"give up\" মানে?", opts:["দেওয়া উপরে","হাল ছাড়া","উপরে তোলা"], a:1},
     {q:"দেখাশোনা করা বোঝাতে?", opts:["look after","look at","look up"], a:0},
     {q:"খুঁজে বের করা = ?", opts:["find out","put off","give in"], a:0}
   ]},
  {id:"a3", level:"adv", cat:"writing", title:"বর্ণনা করা — Describing People & Places",
   intro:"কাউকে বা কোনো জায়গাকে সুন্দরভাবে বর্ণনা করতে adjective আর বাক্য গঠন শিখুন।",
   words:[{en:"appearance", bn:"চেহারা"},{en:"personality", bn:"ব্যক্তিত্ব"},{en:"lively", bn:"প্রাণবন্ত"},{en:"crowded", bn:"ভিড়ে ভরা"},{en:"peaceful", bn:"শান্তিপূর্ণ"}],
   rules:[
     {en:"He is tall, friendly and very hard-working.", bn:"সে লম্বা, বন্ধুসুলভ এবং খুব পরিশ্রমী।"},
     {en:"Dhaka is a busy but lively city.", bn:"ঢাকা একটা ব্যস্ত কিন্তু প্রাণবন্ত শহর।"},
     {en:"The village is peaceful, especially at dawn.", bn:"গ্রামটা শান্তিপূর্ণ, বিশেষ করে ভোরবেলা।"}
   ],
   structure:{title:"🧱 বর্ণনার সূত্র", points:[
     {pattern:"subject + is/are + adj1 + adj2 + adj3", bn:"He is tall, kind and smart."},
     {pattern:"place + is a + adj + city/village", bn:"Dhaka is a busy city."}
   ]},
   quiz:[
     {q:"মানুষের ব্যক্তিত্ব বোঝাতে কোনটি?", opts:["He is tall.","He is honest and kind.","He is in Dhaka."], a:1},
     {q:"\"crowded\" মানে?", opts:["জনশূন্য","ভিড়ে ভরা","পরিষ্কার"], a:1},
     {q:"শহর বর্ণনায় কোনটি সঠিক?", opts:["Dhaka is busy city.","Dhaka is a busy city.","Dhaka is the busy city."], a:1}
   ]},
  {id:"i4", level:"inter", cat:"speaking", title:"চাকরির ভাইভা — নিজেকে উপস্থাপন",
   intro:"চাকরির ইন্টারভিউতে যেসব বাক্য দরকার — Tell me about yourself থেকে I'm a quick learner পর্যন্ত।",
   words:[{en:"experience", bn:"অভিজ্ঞতা"},{en:"skill", bn:"দক্ষতা"},{en:"responsible", bn:"দায়িত্বশীল"},{en:"team", bn:"দল"},{en:"strength", bn:"শক্তি/দক্ষতা"}],
   rules:[
     {en:"I have three years of experience in sales.", bn:"আমার সেলসে তিন বছরের অভিজ্ঞতা আছে।"},
     {en:"I'm a quick learner and hard-working.", bn:"আমি দ্রুত শিখি এবং পরিশ্রমী।"},
     {en:"I can work well in a team.", bn:"আমি দলে ভালোভাবে কাজ করতে পারি।"}
   ],
   structure:{title:"🧱 ভাইভায় নিজেকে উপস্থাপনের সূত্র", points:[
     {pattern:"I have + number + years of experience", bn:"I have 3 years of experience."},
     {pattern:"I'm a + দক্ষতা + and + দক্ষতা", bn:"I'm a quick learner and hard-working."}
   ]},
   quiz:[
     {q:"অভিজ্ঞতা বলতে কোনটি সঠিক?", opts:["I have 2 years experience.","I have 2 years of experience.","I am 2 years experienced."], a:1},
     {q:"দ্রুত শেখা বোঝাতে?", opts:["I'm a quick learner.","I learn quickful.","I am quick learn."], a:0},
     {q:"\"team\" মানে?", opts:["একা কাজ","দল","প্রতিযোগিতা"], a:1}
   ]},
  {id:"i5", level:"inter", cat:"speaking", title:"অভিমত দেওয়া ও নেওয়া",
   intro:"I think..., In my opinion... — নিজের মত প্রকাশ করতে আর অন্যের মতের সাথে দ্বিমত করতে শিখুন।",
   words:[{en:"opinion", bn:"মতামত"},{en:"agree", bn:"একমত"},{en:"disagree", bn:"দ্বিমত"},{en:"maybe", bn:"হয়তো"},{en:"certainly", bn:"অবশ্যই"}],
   rules:[
     {en:"In my opinion, English is very useful.", bn:"আমার মতে, ইংরেজি খুব কাজের।"},
     {en:"I agree with you.", bn:"আমি আপনার সাথে একমত।"},
     {en:"I'm sorry, but I disagree.", bn:"দুঃখিত, কিন্তু আমি একমত নই। — ভদ্রভাবে দ্বিমত।"}
   ],
   structure:{title:"🧱 মত প্রকাশের সূত্র", points:[
     {pattern:"In my opinion / I think", bn:"নিজের মত"},
     {pattern:"I agree / I disagree", bn:"একমত/দ্বিমত"}
   ]},
   quiz:[
     {q:"নিজের মত বলতে?", opts:["In my opinion...","You are wrong.","Nobody cares."], a:0},
     {q:"একমত হলে বলবেন?", opts:["I disagree.","I agree with you.","I don't care."], a:1},
     {q:"\"maybe\" এর অর্থ?", opts:["অবশ্যই","হয়তো","কখনোই না"], a:1}
   ]}
];

// ------------------------- PRACTICE SCENARIOS -------------------------
const DEFAULT_SCENARIOS = [
  {id:"rest", icon:"🍽️", title:"Restaurant", sub:"রেস্টুরেন্টে অর্ডার করা",
   prompt:"Welcome to Green Restaurant! 🍽️ I'm your waiter. What would you like to order today?",
   hints:["I'd like a chicken burger, please.","Can I see the menu?","The bill, please."],
   aiNote:"You are a friendly restaurant waiter. The user is a Bangladeshi English learner practicing ordering food. Ask natural questions about their order, suggest items, keep it short (1-2 sentences). Correct gently if they make mistakes."},
  {id:"shop", icon:"🛍️", title:"Shopping", sub:"দোকানে কেনাকাটা",
   prompt:"Hello! Welcome to our shop! 🛍️ How can I help you today?",
   hints:["How much is this shirt?","Do you have a smaller size?","I'm just looking, thanks."],
   aiNote:"You are a shopkeeper. The user is a Bangladeshi English learner practicing shopping conversations. Talk about prices, sizes, colors. Keep it short. Correct gently if needed."},
  {id:"interv", icon:"💼", title:"Job Interview", sub:"চাকরির ভাইভা",
   prompt:"Good morning! Please have a seat. I'm the hiring manager. Let's start — tell me about yourself.",
   hints:["I'm a hard-working person.","I have 2 years of experience.","I'm a quick learner."],
   aiNote:"You are a job interviewer at a company. The user is a Bangladeshi English learner practicing interview skills. Ask common interview questions: strengths, weaknesses, experience, goals. Keep it short and encouraging."},
  {id:"doctor", icon:"🩺", title:"At the Doctor", sub:"ডাক্তারের কাছে",
   prompt:"Hello! I'm Dr. Rahman. What seems to be the problem today?",
   hints:["I have a fever.","I have a headache since yesterday.","My stomach hurts."],
   aiNote:"You are a doctor. The user is a Bangladeshi English learner practicing describing health problems. Ask about symptoms, give simple advice. Keep it short. Correct gently."},
  {id:"travel", icon:"✈️", title:"Travel & Airport", sub:"ভ্রমণ ও এয়ারপোর্ট",
   prompt:"Good morning! Welcome to the airport help desk. ✈️ Where are you flying today?",
   hints:["I want to book a ticket to Dubai.","Where is gate 5?","I lost my luggage."],
   aiNote:"You are an airport staff member. The user is a Bangladeshi English learner practicing travel English. Help with tickets, gates, luggage. Keep it short. Correct gently."},
  {id:"free", icon:"💬", title:"Free Talk", sub:"যেকোনো বিষয়ে আলাপ",
   prompt:"Hi there! 👋 I'm your English practice partner. Let's chat about anything — hobbies, movies, food, dreams! What do you want to talk about?",
   hints:["Let's talk about cricket!","I love biryani!","What's your favorite movie?"],
   aiNote:"You are a friendly conversation partner. The user is a Bangladeshi English learner practicing free conversation. Ask follow-up questions about their interests. Keep it short. Correct mistakes gently."}
];

// ------------------------- KIDS CONTENT -------------------------
const KIDS_LETTERS = [
  {l:"A", word:"Apple", bn:"আপেল (আম কুড়ি নয়!)", emoji:"🍎", phon:"A for Apple"},
  {l:"B", word:"Ball", bn:"বল", emoji:"⚽", phon:"B for Ball"},
  {l:"C", word:"Cat", bn:"বিড়াল", emoji:"🐱", phon:"C for Cat"},
  {l:"D", word:"Dog", bn:"কুকুর", emoji:"🐶", phon:"D for Dog"},
  {l:"E", word:"Elephant", bn:"হাতি", emoji:"🐘", phon:"E for Elephant"},
  {l:"F", word:"Fish", bn:"মাছ", emoji:"🐟", phon:"F for Fish"},
  {l:"G", word:"Goat", bn:"ছাগল", emoji:"🐐", phon:"G for Goat"},
  {l:"H", word:"Hat", bn:"টুপি", emoji:"👒", phon:"H for Hat"},
  {l:"I", word:"Ice cream", bn:"আইসক্রিম", emoji:"🍦", phon:"I for Ice cream"},
  {l:"J", word:"Jug", bn:"জগ", emoji:"🫗", phon:"J for Jug"},
  {l:"K", word:"Kite", bn:"ঘুড়ি", emoji:"🪁", phon:"K for Kite"},
  {l:"L", word:"Lion", bn:"সিংহ", emoji:"🦁", phon:"L for Lion"},
  {l:"M", word:"Moon", bn:"চাঁদ", emoji:"🌙", phon:"M for Moon"},
  {l:"N", word:"Nest", bn:"পাখির বাসা", emoji:"🪺", phon:"N for Nest"},
  {l:"O", word:"Orange", bn:"কমলা", emoji:"🍊", phon:"O for Orange"},
  {l:"P", word:"Parrot", bn:"টিয়া পাখি", emoji:"🦜", phon:"P for Parrot"},
  {l:"Q", word:"Queen", bn:"রানী", emoji:"👑", phon:"Q for Queen"},
  {l:"R", word:"Rain", bn:"বৃষ্টি", emoji:"🌧️", phon:"R for Rain"},
  {l:"S", word:"Sun", bn:"সূর্য", emoji:"☀️", phon:"S for Sun"},
  {l:"T", word:"Tiger", bn:"বাঘ", emoji:"🐯", phon:"T for Tiger"},
  {l:"U", word:"Umbrella", bn:"ছাতা", emoji:"☂️", phon:"U for Umbrella"},
  {l:"V", word:"Van", bn:"ভ্যান গাড়ি", emoji:"🚐", phon:"V for Van"},
  {l:"W", word:"Watch", bn:"ঘড়ি", emoji:"⌚", phon:"W for Watch"},
  {l:"X", word:"Xylophone", bn:"বাদ্যযন্ত্র", emoji:"🎹", phon:"X for Xylophone"},
  {l:"Y", word:"Yak", bn:"ভেড়ার মতো পশু", emoji:"🐂", phon:"Y for Yak"},
  {l:"Z", word:"Zebra", bn:"জেব্রা", emoji:"🦓", phon:"Z for Zebra"}
];

const KID_FIRST_WORDS = [
  {en:"apple", bn:"আপেল", emoji:"🍎"},{en:"ball", bn:"বল", emoji:"⚽"},
  {en:"cat", bn:"বিড়াল", emoji:"🐱"},{en:"dog", bn:"কুকুর", emoji:"🐶"},
  {en:"sun", bn:"সূর্য", emoji:"☀️"},{en:"moon", bn:"চাঁদ", emoji:"🌙"},
  {en:"star", bn:"তারা", emoji:"⭐"},{en:"fish", bn:"মাছ", emoji:"🐟"},
  {en:"bird", bn:"পাখি", emoji:"🐦"},{en:"duck", bn:"হাঁস", emoji:"🦆"},
  {en:"cow", bn:"গরু", emoji:"🐄"},{en:"milk", bn:"দুধ", emoji:"🥛"},
  {en:"cake", bn:"কেক", emoji:"🎂"},{en:"car", bn:"গাড়ি", emoji:"🚗"},
  {en:"bus", bn:"বাস", emoji:"🚌"},{en:"book", bn:"বই", emoji:"📖"},
  {en:"pen", bn:"কলম", emoji:"🖊️"},{en:"tree", bn:"গাছ", emoji:"🌳"},
  {en:"flower", bn:"ফুল", emoji:"🌸"},{en:"house", bn:"বাড়ি", emoji:"🏠"}
];

const KID_GAMES = [
  {id:"pickword", icon:"🎯", title:"ভেজাল মেলাও!", sub:"ছবি দেখে সঠিক শব্দ বাছাই করো"},
  {id:"abcsong", icon:"🎵", title:"ABC শেখো", sub:"A থেকে Z — প্রতিটা অক্ষর ছবি ও শব্দসহ"}
];

// ------------------------- AI / SYSTEM -------------------------
const GROQ_MODELS = {
  chat:"llama-3.3-70b-versatile",
  stt:"whisper-large-v3-turbo"
};
