/* Year 9 Digestion — built from the "Year 9 - Digestion" objectives sheet (waves-digestion.pages).
   Objective codes (Bes, Bpk, Bpu…) are shown on each learn card so they can be ticked off on the sheet. */
window.SUBJECTS = window.SUBJECTS || [];
window.SUBJECTS.push({
  id: 'digestion',
  name: 'Digestion',
  icon: '🍎',
  color: '#2a9d8f',
  tagline: 'Nutrition, a healthy diet, teeth & the digestive system',
  lessons: [
    {
      id: 'food-groups',
      emoji: '🥗',
      title: 'Nutrition & the Food Groups',
      learn: [{ type: 'card', html: '<p class="progress-label">Prior Knowledge · Bes, Beq, Bel, Bem · Core+ · Bou, Bpb</p><h3>⭐ Key knowledge: the five main food groups</h3><ul><li>All living things need <b>nutrition</b> — food gives us <b>energy</b>, materials for <b>growth and repair</b>, and keeps us <b>healthy</b>.</li><li>🥦 <b>Fruit and vegetables</b> — vitamins, minerals, fibre. Aim for at least 5 portions a day.</li><li>🍞 <b>Potatoes, bread, rice, pasta</b> (starchy carbohydrates) — energy.</li><li>🫘 <b>Beans, pulses, fish, eggs, meat</b> (protein) — growth and repair.</li><li>🧀 <b>Dairy and alternatives</b> (milk, cheese, yoghurt) — protein and <b>calcium</b> for bones and teeth.</li><li>🧈 <b>Oils and spreads</b> (fats) — energy store and insulation; eat in small amounts.</li></ul><p>A <b>healthy plate</b> (the Eatwell Guide) is mostly fruit, veg and starchy carbs, with some protein and dairy, and only a little oil. Foods high in fat, salt and sugar should be eaten less often.</p><p>⭐ <b>Exercise and healthy eating</b> together keep the heart, muscles and bones healthy and help prevent obesity, diabetes and heart disease.</p>' }],
      questions: [
        { type: 'sort', q: 'Sort each food into its food group.', buckets: ['Fruit & veg', 'Starchy carbs', 'Protein', 'Dairy'], items: [{ text: 'Apple', bucket: 0 }, { text: 'Pasta', bucket: 1 }, { text: 'Chicken', bucket: 2 }, { text: 'Yoghurt', bucket: 3 }, { text: 'Carrot', bucket: 0 }, { text: 'Rice', bucket: 1 }, { text: 'Lentils', bucket: 2 }, { text: 'Cheese', bucket: 3 }], explain: 'The Eatwell Guide groups foods by the main nutrients they provide.' },
        { type: 'choice', q: 'Which TWO food groups should make up most of a healthy plate?', options: ['Fruit & veg and starchy carbohydrates', 'Oils and dairy', 'Protein and oils', 'Sweets and crisps'], answer: 0, explain: 'Together they make up about two-thirds of the Eatwell plate.' },
        { type: 'choice', q: 'Why do we need nutrition?', options: ['For energy, growth and repair, and to stay healthy', 'Only to stop feeling hungry', 'Only for energy', 'It is not needed if you exercise'], answer: 0, explain: 'Food provides energy, building materials and substances that keep us healthy.' },
        { type: 'choice', q: 'Which food group should you eat the LEAST of?', options: ['Oils and spreads', 'Fruit and vegetables', 'Potatoes, bread, rice and pasta', 'Beans and pulses'], answer: 0, explain: 'Oils and spreads are high in energy, so only small amounts are needed.' },
        { type: 'choice', q: 'Why is exercise as important as healthy eating?', options: ['It uses energy and keeps the heart, muscles and bones healthy', 'It means you can eat anything', 'It replaces the need for vitamins', 'It only matters for athletes'], answer: 0, explain: 'Diet and exercise together reduce the risk of obesity, heart disease and type 2 diabetes.' },
        { type: 'type', q: 'How many main food groups are on the Eatwell Guide? (number)', answer: ['5', 'five'], explain: 'Fruit & veg, starchy carbs, protein, dairy, oils & spreads.' }
      ]
    },
    {
      id: 'nutrients',
      emoji: '💪',
      title: 'Why We Need Each Nutrient',
      learn: [{ type: 'card', html: '<p class="progress-label">Core · Bot, Bov, Bow, Box, Boy, Boz, Bpa</p><h3>A healthy diet contains all seven nutrients in the right amounts</h3><ul><li>🍞 <b>Carbohydrates</b> (bread, pasta, potatoes) — the body\'s main source of <b>energy</b>.</li><li>🥚 <b>Proteins</b> (meat, fish, eggs, beans) — for <b>growth and repair</b> of cells and tissues.</li><li>🧈 <b>Lipids — fats and oils</b> (butter, oil, nuts) — <b>store energy</b>, keep us warm (insulation) and protect organs.</li><li>🍊 <b>Vitamins</b> (fruit, veg) — needed in small amounts to keep us <b>healthy</b>, e.g. vitamin C for healthy skin and gums, vitamin D for strong bones.</li><li>🥛 <b>Minerals</b> — also needed in small amounts, e.g. <b>calcium</b> for bones and teeth, <b>iron</b> to make red blood cells.</li><li>🌾 <b>Fibre</b> (wholegrains, veg) — keeps food <b>moving through the gut</b> and prevents constipation.</li><li>💧 <b>Water</b> — needed in every cell and for chemical reactions; keeps us hydrated. We lose water in sweat, urine and breath.</li></ul>' }],
      questions: [
        { type: 'match', q: 'Match each nutrient to why we need it.', pairs: [['Carbohydrates', 'Main source of energy'], ['Proteins', 'Growth and repair'], ['Lipids', 'Energy store and insulation'], ['Fibre', 'Keeps food moving through the gut'], ['Water', 'Needed in every cell and reaction']], explain: 'Each nutrient has a different job.' },
        { type: 'choice', q: 'Why do we need vitamins and minerals?', options: ['In small amounts, to keep the body healthy', 'As our main source of energy', 'To store energy as fat', 'To make food move through the gut'], answer: 0, explain: 'E.g. vitamin C for skin and gums, calcium for bones, iron for blood.' },
        { type: 'choice', q: 'A bodybuilder wants to build muscle. Which nutrient is most important?', options: ['Protein', 'Fibre', 'Water', 'Vitamin C'], answer: 0, explain: 'Protein is used for growth and repair of tissues like muscle.' },
        { type: 'type', q: 'Which mineral is needed for strong bones and teeth?', answer: ['calcium'], explain: 'Found in milk, cheese and yoghurt.' },
        { type: 'choice', q: 'What does fibre do?', options: ['Helps food move through the intestines and prevents constipation', 'Gives us lots of energy', 'Builds muscle', 'Carries oxygen in the blood'], answer: 0, explain: 'Fibre is not digested — it adds bulk so the gut muscles can push food along.' },
        { type: 'sort', q: 'Which nutrient is each food richest in?', buckets: ['Carbohydrate', 'Protein', 'Lipid (fat)'], items: [{ text: 'Potatoes', bucket: 0 }, { text: 'Fish', bucket: 1 }, { text: 'Butter', bucket: 2 }, { text: 'Bread', bucket: 0 }, { text: 'Eggs', bucket: 1 }, { text: 'Olive oil', bucket: 2 }], explain: 'Most foods contain several nutrients — this is the main one.' },
        { type: 'type', q: 'Which mineral is needed to make red blood cells?', answer: ['iron'], explain: 'Red meat, spinach and beans are good sources of iron.' }
      ]
    },
    {
      id: 'balanced-diet',
      emoji: '🏷️',
      title: 'Food Labels, Energy & Diet Imbalances',
      learn: [{ type: 'card', html: '<p class="progress-label">Core+ · Bpe, Bpf, Bpd, Bpg, Bph, Bpi</p><h3>⭐ Key knowledge: what food labels tell us</h3><ul><li>Labels show <b>energy</b> (in kJ and kcal), <b>fat</b>, <b>saturates</b>, <b>sugars</b> and <b>salt</b>, usually per 100 g and per portion.</li><li><b>Traffic-light labels:</b> 🟢 green = low, 🟠 amber = medium, 🔴 red = high. Choose more greens.</li><li><b>%RI</b> (reference intake) shows what percentage of an adult\'s daily needs one portion gives.</li></ul><h3>Energy calculations</h3><ul><li>Daily energy needs depend on age, sex and how active you are. A typical teenager needs roughly <b>2000–2500 kcal</b> a day; an active person needs more.</li><li>Add up the energy in each meal and compare with the daily need. <b>Energy in &gt; energy used</b> → weight gain.</li></ul><h3>⭐ Key knowledge: imbalances in the diet</h3><ul><li><b>Obesity</b> — eating more energy than you use, over a long time. Raises the risk of heart disease and type 2 diabetes.</li><li><b>Starvation</b> — not enough food/energy. The body breaks down its own fat and muscle; people become very thin and weak.</li><li><b>Deficiency diseases</b> — missing one nutrient: <b>scurvy</b> (vitamin C — bleeding gums), <b>rickets</b> (vitamin D / calcium — weak, bent bones), <b>anaemia</b> (iron — tiredness).</li></ul>' }],
      questions: [
        { type: 'choice', q: 'On a traffic-light food label, what does RED mean?', options: ['High in that nutrient — eat less often', 'Low — a healthy choice', 'Medium amount', 'The food is out of date'], answer: 0, explain: 'Red = high in fat, saturates, sugar or salt.' },
        { type: 'match', q: 'Match the deficiency disease to the missing nutrient.', pairs: [['Scurvy', 'Vitamin C'], ['Rickets', 'Vitamin D or calcium'], ['Anaemia', 'Iron']], explain: 'A deficiency disease is caused by a lack of one nutrient.' },
        { type: 'choice', q: 'What causes obesity?', options: ['Taking in more energy than you use over a long time', 'Not eating enough food', 'Missing vitamin C', 'Drinking too much water'], answer: 0, explain: 'Extra energy is stored as fat.' },
        { type: 'type', q: 'Breakfast is 400 kcal, lunch 700 kcal, dinner 800 kcal and snacks 300 kcal. What is the total energy in kcal? (number only)', answer: ['2200'], explain: '400 + 700 + 800 + 300 = 2200 kcal.' },
        { type: 'type', q: 'A teenager needs 2500 kcal a day. They have eaten 1800 kcal so far. How many more kcal do they need? (number only)', answer: ['700'], explain: '2500 − 1800 = 700 kcal.' },
        { type: 'choice', q: 'What happens to the body during starvation?', options: ['It breaks down its own fat and muscle for energy', 'It stores extra fat', 'It grows faster', 'Nothing — the body does not need food'], answer: 0, explain: 'Without enough energy from food, the body uses its own stores.' },
        { type: 'sort', q: 'Is each problem caused by too much, or too little?', buckets: ['Too much energy', 'Too little food or a nutrient'], items: [{ text: 'Obesity', bucket: 0 }, { text: 'Starvation', bucket: 1 }, { text: 'Scurvy', bucket: 1 }, { text: 'Rickets', bucket: 1 }], explain: 'An unbalanced diet can mean too much OR too little.' }
      ]
    },
    {
      id: 'teeth',
      emoji: '🦷',
      title: 'Types of Teeth',
      learn: [{ type: 'card', html: '<p class="progress-label">Core · Bff, Bfg, Bfh, Bfi, Bfj, Bfk, Bfl, Bfm, Bfn, Bfo</p><h3>Humans have different types of teeth for different jobs</h3><p>Digestion starts in the mouth — teeth break food into smaller pieces (<b>mechanical digestion</b>) so it is easier to swallow and has a bigger surface area for enzymes.</p><ul><li>✂️ <b>Incisors</b> — at the <b>front</b>, flat and sharp like chisels. They <b>cut and bite</b> food (e.g. biting into an apple).</li><li>🐺 <b>Canines</b> — either side of the incisors, <b>pointed</b>. They <b>tear and grip</b> food (e.g. chewy meat).</li><li>⚙️ <b>Molars</b> (and premolars) — at the <b>back</b>, wide and bumpy. They <b>grind and chew</b> food into a mush.</li></ul><p>Adults have 32 teeth: 8 incisors, 4 canines, 8 premolars and 12 molars (including wisdom teeth).</p>' }],
      questions: [
        { type: 'match', q: 'Match each tooth to its job.', pairs: [['Incisors', 'Cut and bite'], ['Canines', 'Tear and grip'], ['Molars', 'Grind and chew']], explain: 'Each tooth shape suits its job.' },
        { type: 'choice', q: 'Which teeth are at the very front of your mouth?', options: ['Incisors', 'Molars', 'Canines', 'Premolars'], answer: 0, explain: 'Incisors are flat chisel-shaped teeth at the front.' },
        { type: 'choice', q: 'Which teeth are pointed and found either side of the incisors?', options: ['Canines', 'Molars', 'Incisors', 'Wisdom teeth'], answer: 0, explain: 'Canines are named after dogs, which have large ones for tearing meat.' },
        { type: 'type', q: 'Name the wide, bumpy teeth at the back of the mouth.', answer: ['molars', 'molar', 'molars and premolars'], explain: 'Molars grind food into small pieces.' },
        { type: 'choice', q: 'You bite into an apple. Which teeth do this first?', options: ['Incisors', 'Molars', 'Canines', 'None — the tongue does it'], answer: 0, explain: 'Incisors cut. Then molars grind the bite you took.' },
        { type: 'choice', q: 'Why do teeth break food into small pieces?', options: ['To make it easier to swallow and give a bigger surface area for enzymes', 'To make it taste nicer', 'To add water to it', 'To absorb the nutrients in the mouth'], answer: 0, explain: 'This is mechanical digestion.' }
      ]
    },
    {
      id: 'digestive-organs',
      emoji: '🫃',
      title: 'Organs of the Digestive System',
      learn: [{ type: 'card', html: '<p class="progress-label">Prior Knowledge · Bet, Beu, Bev, Bew, Bex, Bey, Bez, Bgp, Bgu, Bfd · Core+ · Bpj</p><h3>⭐ Key knowledge: the digestive system and where its organs are</h3><ul><li>👄 <b>Mouth</b> — teeth chew food; saliva starts digesting starch.</li><li>🔽 <b>Oesophagus</b> (gullet) — muscular tube from mouth to stomach.</li><li>🫙 <b>Stomach</b> — a muscular bag on the <b>left side of the upper abdomen</b>, just below the ribs. Churns food with acid and enzymes.</li><li>🟤 <b>Liver</b> — large organ on the upper right; makes <b>bile</b> (stored in the gall bladder) to help digest fats.</li><li>🟡 <b>Pancreas</b> — behind the stomach; makes digestive enzymes.</li><li>🌀 <b>Small intestine</b> — long, narrow, coiled tube (about 6–7 m!) in the middle of the abdomen. Finishes digestion and <b>absorbs nutrients</b> into the blood.</li><li>🔁 <b>Large intestine</b> — wider tube that goes around the outside of the small intestine. <b>Absorbs water</b>.</li><li>🚽 <b>Rectum</b> and <b>anus</b> — store and then remove undigested waste (faeces).</li></ul><p>Living things get rid of waste. Removing undigested food (faeces) is called <b>egestion</b>; removing waste made by the body\'s chemical reactions (like urine and carbon dioxide) is <b>excretion</b>.</p>' }],
      questions: [
        { type: 'choice', q: 'Where is the stomach found?', options: ['Upper left of the abdomen, just below the ribs', 'Low down on the right, near the hip', 'In the chest, next to the heart', 'In the neck'], answer: 0, explain: 'The stomach sits under the left side of the ribcage.' },
        { type: 'choice', q: 'Which organ is a long, narrow, coiled tube where nutrients are absorbed into the blood?', options: ['Small intestine', 'Large intestine', 'Oesophagus', 'Stomach'], answer: 0, explain: 'The small intestine is narrow but very long — about 6–7 metres.' },
        { type: 'choice', q: 'Which organ is a wide tube that absorbs water from undigested food?', options: ['Large intestine', 'Small intestine', 'Liver', 'Oesophagus'], answer: 0, explain: '"Large" refers to its width, not its length.' },
        { type: 'type', q: 'The muscular tube that carries food from the mouth to the stomach is the _____.', answer: ['oesophagus', 'esophagus', 'gullet'], explain: 'Also called the gullet.' },
        { type: 'match', q: 'Match each organ to its description.', pairs: [['Stomach', 'Muscular bag that churns food with acid'], ['Liver', 'Makes bile'], ['Pancreas', 'Makes digestive enzymes'], ['Rectum', 'Stores faeces before they leave the body']], explain: 'Every organ in the system has a job.' },
        { type: 'sort', q: 'Is each organ part of the digestive system?', buckets: ['Digestive system ✅', 'Not digestive ❌'], items: [{ text: 'Stomach', bucket: 0 }, { text: 'Lungs', bucket: 1 }, { text: 'Small intestine', bucket: 0 }, { text: 'Heart', bucket: 1 }, { text: 'Large intestine', bucket: 0 }, { text: 'Brain', bucket: 1 }], explain: 'Lungs, heart and brain belong to other organ systems.' },
        { type: 'choice', q: 'Getting rid of undigested food as faeces is called…', options: ['Egestion', 'Respiration', 'Absorption', 'Ingestion'], answer: 0, explain: 'Excretion is removing waste made by the body\'s chemical reactions, e.g. urine.' }
      ]
    },
    {
      id: 'route-of-food',
      emoji: '🛤️',
      title: 'The Journey of Food',
      learn: [{ type: 'card', html: '<p class="progress-label">Prior Knowledge · Bfe, Bfa, Bfb, Bfc · Core+ · Bpk, Bpl, Bpv</p><h3>⭐ Key knowledge: the route food takes</h3><p style="text-align:center"><b>Mouth → Oesophagus → Stomach → Small intestine → Large intestine → Rectum → Anus</b></p><h3>⭐ Key knowledge: basic stages of digestion</h3><ol><li><b>Ingestion</b> — taking food into the mouth.</li><li><b>Digestion</b> — breaking large, insoluble food molecules into small, soluble ones. <i>Mechanical</i> (teeth chewing, stomach churning) and <i>chemical</i> (enzymes).</li><li><b>Absorption</b> — small molecules pass through the wall of the small intestine into the <b>blood</b>.</li><li><b>Water absorption</b> — the large intestine takes water back into the body.</li><li><b>Egestion</b> — undigested food (faeces) leaves through the anus.</li></ol><ul><li><b>In the stomach:</b> muscles churn food, hydrochloric acid kills bacteria, and enzymes (protease) start breaking down protein. Food stays about 2–4 hours and becomes a thick liquid.</li><li>The whole journey takes roughly <b>24–72 hours</b> (1–3 days).</li></ul>' }],
      questions: [
        { type: 'order', q: 'Put the organs in the order food passes through them.', items: ['Mouth', 'Oesophagus', 'Stomach', 'Small intestine', 'Large intestine', 'Rectum', 'Anus'], explain: 'The liver and pancreas help digestion, but food does not pass through them.' },
        { type: 'order', q: 'Put the stages of digestion in order.', items: ['Ingestion (eating)', 'Digestion (breaking down)', 'Absorption into the blood', 'Water absorbed', 'Egestion (faeces removed)'], explain: 'In, break down, absorb, remove the waste.' },
        { type: 'choice', q: 'What happens to food when it reaches the stomach?', options: ['It is churned and mixed with acid and enzymes', 'Nutrients are absorbed into the blood', 'Water is absorbed', 'It is chewed'], answer: 0, explain: 'The stomach churns food and starts digesting protein.' },
        { type: 'choice', q: 'Roughly how long does it take food to pass all the way through the digestive system?', options: ['About 1–3 days', 'About 5 minutes', 'About 1 hour', 'About 2 weeks'], answer: 0, explain: 'Typically 24–72 hours.' },
        { type: 'match', q: 'Match each organ to its basic function.', pairs: [['Stomach', 'Churns food with acid and enzymes'], ['Small intestine', 'Absorbs nutrients into the blood'], ['Large intestine', 'Absorbs water']], explain: 'These are the three big jobs in the gut.' },
        { type: 'choice', q: 'What is the purpose of digestion?', options: ['To break large insoluble molecules into small soluble ones that can be absorbed', 'To make food bigger', 'To turn food into water', 'To store food in the stomach'], answer: 0, explain: 'Only small, soluble molecules can pass into the blood.' },
        { type: 'sort', q: 'Is it mechanical or chemical digestion?', buckets: ['Mechanical', 'Chemical'], items: [{ text: 'Teeth chewing', bucket: 0 }, { text: 'Enzymes breaking down starch', bucket: 1 }, { text: 'Stomach muscles churning', bucket: 0 }, { text: 'Protease breaking down protein', bucket: 1 }], explain: 'Mechanical = physically breaking up; chemical = enzymes changing molecules.' }
      ]
    },
    {
      id: 'acid-enzymes',
      emoji: '🧪',
      title: 'Stomach Acid & Enzymes',
      learn: [{ type: 'card', html: '<p class="progress-label">Core+ · Bpm, Bpn, Bps, Bpt, Bpu</p><h3>Stomach acid</h3><ul><li>The stomach makes <b>hydrochloric acid</b>.</li><li>It <b>kills bacteria</b> and microbes in our food, and gives the stomach enzymes the <b>acidic conditions (low pH)</b> they work best in.</li></ul><h3>⭐ Key knowledge: what an enzyme does</h3><ul><li>An <b>enzyme</b> is a protein that is a <b>biological catalyst</b>: it <b>speeds up</b> chemical reactions in living things <b>without being used up</b>.</li><li>Digestive enzymes break <b>large</b> food molecules into <b>small</b>, soluble molecules.</li><li>Each enzyme only works on <b>one type</b> of molecule — like a lock and key.</li></ul><table style="width:100%;border-collapse:collapse"><tr><th align="left">Enzyme</th><th align="left">Breaks down</th><th align="left">Into</th></tr><tr><td><b>Amylase</b> (carbohydrase)</td><td>Starch</td><td>Sugars</td></tr><tr><td><b>Protease</b></td><td>Proteins</td><td>Amino acids</td></tr><tr><td><b>Lipase</b></td><td>Lipids (fats)</td><td>Fatty acids + glycerol</td></tr></table>' }],
      questions: [
        { type: 'type', q: 'Name the acid found in the stomach.', answer: ['hydrochloric acid', 'hydrochloric', 'hcl'], explain: 'Hydrochloric acid (HCl).' },
        { type: 'choice', q: 'What are the jobs of stomach acid?', options: ['Kills bacteria and gives stomach enzymes the acidic conditions they need', 'Absorbs water', 'Makes bile', 'Breaks down fibre'], answer: 0, explain: 'It protects us from microbes and helps protease work.' },
        { type: 'choice', q: 'An enzyme is best described as…', options: ['A biological catalyst that speeds up reactions without being used up', 'A type of food', 'A vitamin', 'A chemical that slows reactions down'], answer: 0, explain: 'Enzymes are proteins that speed up reactions in living things.' },
        { type: 'type', q: 'An enzyme is a biological _____.', answer: ['catalyst'], explain: 'A catalyst speeds up a reaction and is not used up.' },
        { type: 'match', q: 'Match each enzyme to what it breaks down.', pairs: [['Amylase', 'Starch → sugars'], ['Protease', 'Proteins → amino acids'], ['Lipase', 'Lipids → fatty acids and glycerol']], explain: 'Amylase-starch, protease-protein, lipase-lipid.' },
        { type: 'choice', q: 'Why do we need digestive enzymes?', options: ['To break large food molecules into small ones that can be absorbed', 'To make food larger', 'To kill bacteria', 'To move food along the gut'], answer: 0, explain: 'Large molecules cannot pass through the gut wall into the blood.' },
        { type: 'choice', q: 'Protein is broken down into…', options: ['Amino acids', 'Sugars', 'Fatty acids', 'Glycerol only'], answer: 0, explain: 'Proteins are chains of amino acids.' }
      ]
    },
    {
      id: 'absorption-adaptations',
      emoji: '🔬',
      title: 'Organ Functions & Adaptations',
      learn: [{ type: 'card', html: '<p class="progress-label">Core+ · Bpqa, Bpo, Bpq · Core++ · Bpp, Bpr, Bpw</p><h3>⭐ Key knowledge: functions of the digestive organs</h3><ul><li><b>Small intestine:</b> enzymes from the pancreas finish digestion, and the small, soluble food molecules are <b>absorbed into the blood</b>.</li><li><b>Large intestine:</b> its main function is to <b>absorb water</b> back into the body, leaving solid faeces.</li></ul><h3>⭐ Key knowledge: the small intestine is adapted for absorption</h3><ul><li>🌀 It is very <b>long</b> (6–7 m) — more time and space to absorb.</li><li>🖐️ Its inner wall is covered in millions of finger-like <b>villi</b> (and the villi have tiny <b>microvilli</b>) — a huge <b>surface area</b>.</li><li>🧱 The villi walls are only <b>one cell thick</b> — a short distance for nutrients to diffuse.</li><li>🩸 Each villus has a rich <b>blood supply</b> (capillaries) to carry nutrients away quickly.</li></ul><h3>⭐ Key knowledge: how we get nutrients and keep our water balance</h3><ul><li>We get nutrients by <b>eating, digesting and absorbing</b> food. The blood carries nutrients to every cell.</li><li>We gain water from <b>drinks and food</b> and from respiration; we lose it in <b>urine, sweat, breath and faeces</b>. The <b>kidneys</b> control how much water we keep; the <b>large intestine</b> takes water back from waste.</li></ul>' }],
      questions: [
        { type: 'choice', q: 'What are villi?', options: ['Tiny finger-like folds lining the small intestine', 'Enzymes made in the stomach', 'Bacteria in the large intestine', 'Types of teeth'], answer: 0, explain: 'Villi give the small intestine an enormous surface area.' },
        { type: 'sort', q: 'Which features help the small intestine absorb nutrients?', buckets: ['Helps absorption ✅', 'Does not help ❌'], items: [{ text: 'Villi giving a large surface area', bucket: 0 }, { text: 'Walls one cell thick', bucket: 0 }, { text: 'Rich blood supply', bucket: 0 }, { text: 'Very thick, waterproof walls', bucket: 1 }, { text: 'Very long length', bucket: 0 }, { text: 'Being very short', bucket: 1 }], explain: 'Large surface area, short diffusion distance, good blood supply.' },
        { type: 'choice', q: 'What is the main function of the large intestine?', options: ['Absorbing water', 'Digesting protein', 'Making bile', 'Chewing food'], answer: 0, explain: 'Water is reabsorbed, leaving solid faeces.' },
        { type: 'choice', q: 'Why does a rich blood supply help the small intestine?', options: ['It carries absorbed nutrients away quickly, so more can be absorbed', 'It makes the intestine warm', 'It produces enzymes', 'It stops food moving'], answer: 0, explain: 'Moving nutrients away keeps a steep concentration gradient for diffusion.' },
        { type: 'choice', q: 'Why are the walls of the villi only one cell thick?', options: ['So nutrients only have a short distance to diffuse into the blood', 'To make them stronger', 'To stop absorption', 'So they can make acid'], answer: 0, explain: 'A short diffusion distance means faster absorption.' },
        { type: 'sort', q: 'How does the body gain or lose water?', buckets: ['Gain water', 'Lose water'], items: [{ text: 'Drinking', bucket: 0 }, { text: 'Sweating', bucket: 1 }, { text: 'Eating fruit', bucket: 0 }, { text: 'Urine', bucket: 1 }, { text: 'Breathing out', bucket: 1 }], explain: 'Keeping these balanced is water balance.' },
        { type: 'type', q: 'Which organs control how much water the body keeps, by making more or less urine?', answer: ['kidneys', 'kidney', 'the kidneys'], explain: 'The kidneys balance water; the large intestine also reabsorbs water from waste.' }
      ]
    }
  ]
});
