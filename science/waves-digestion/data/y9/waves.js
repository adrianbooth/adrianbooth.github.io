/* Year 9 Waves — built from the "Year 9 waves" objectives sheet (waves-digestion.pages).
   Objective codes (Poi, Puk, Pvt…) are shown on each learn card so they can be ticked off on the sheet. */
window.SUBJECTS = window.SUBJECTS || [];
window.SUBJECTS.push({
  id: 'waves',
  name: 'Waves',
  icon: '〰️',
  color: '#3a86ff',
  tagline: 'Light, sound, wave properties & the electromagnetic spectrum',
  lessons: [
    {
      id: 'light-sound-waves',
      emoji: '💡',
      title: 'Light & Sound Travel as Waves',
      learn: [{ type: 'card', html: '<p class="progress-label">Prior Knowledge · Poi, Poj, Pok, Pol, Pom, Pon</p><h3>⭐ Key knowledge: light and sound travel as waves</h3><ul><li><b>Light</b> is a form of energy that travels as a wave.</li><li><b>Sound</b> is a form of energy that travels as a wave too.</li><li>Light from the <b>Sun</b> travels about 150 million km through <b>space</b> to reach Earth — it takes about 8 minutes.</li><li>A <b>vacuum</b> is a completely empty space with <b>no particles</b> in it (no air, nothing). Space is almost a vacuum.</li><li>Light <b>can</b> travel through a vacuum. That is why we can see the Sun and stars.</li><li>Light travels in <b>straight lines</b>. Demonstrate it: line up three cards with holes in them and shine a torch through — you only see the light when the holes are in a straight line. Shadows with sharp edges also show light travels in straight lines.</li><li>Light is incredibly fast: about <b>300 000 000 m/s</b>.</li></ul>' }],
      questions: [
        { type: 'choice', q: 'Light is a form of energy that travels as a…', options: ['Wave', 'Liquid', 'Particle of air', 'Sound'], answer: 0, explain: 'Light (and sound) are energy that travels as waves.' },
        { type: 'type', q: 'A completely empty space with no particles at all is called a _____.', answer: ['vacuum', 'a vacuum'], explain: 'A vacuum has no particles — no air, nothing.' },
        { type: 'choice', q: 'How does light from the Sun reach the Earth?', options: ['It travels as a wave through the near-vacuum of space', 'It is carried by air particles all the way', 'It travels along the Sun\'s magnetic field only', 'It only reaches us when there are clouds'], answer: 0, explain: 'Light does not need particles, so it can cross empty space.' },
        { type: 'choice', q: 'Three cards with holes are lined up and a torch shines through. When do you see the light on the other side?', options: ['Only when all the holes are in a straight line', 'Whenever the torch is switched on', 'Only when one card is moved out of line', 'Never — light cannot pass through holes'], answer: 0, explain: 'This shows light travels in straight lines.' },
        { type: 'choice', q: 'Which of these is also evidence that light travels in straight lines?', options: ['Shadows have sharp edges', 'Sound echoes in a hall', 'Mirrors feel cold', 'Light bulbs get hot'], answer: 0, explain: 'Light cannot bend around an object, so a shadow forms behind it.' },
        { type: 'sort', q: 'Can it travel through a vacuum?', buckets: ['Yes ✅', 'No ❌'], items: [{ text: 'Light', bucket: 0 }, { text: 'Sound', bucket: 1 }, { text: 'Light from distant stars', bucket: 0 }, { text: 'An astronaut\'s shout in space', bucket: 1 }], explain: 'Light needs no medium; sound needs particles.' }
      ]
    },
    {
      id: 'how-sound-travels',
      emoji: '🔊',
      title: 'How Sound Travels',
      learn: [{ type: 'card', html: '<p class="progress-label">Prior Knowledge · Ppv, Ppw, Ppx, Ppy, Ppz</p><h3>Sound needs a medium</h3><ul><li>Sound is made by <b>vibrations</b>. The vibrating object makes the particles next to it vibrate, and they pass the vibration on to the next particles.</li><li>So sound can only travel through a <b>medium</b> (a solid, liquid or gas) — something with particles. It <b>cannot</b> travel through a vacuum.</li><li>Light does not need a medium — it can travel through a vacuum as well as through air, water and glass.</li><li><b>Particle theory:</b> in a <b>solid</b> the particles are packed tightly together, so each one bumps into its neighbour quickly. In a <b>gas</b> the particles are far apart, so passing the vibration on takes longer.</li><li>So sound travels <b>fastest in solids</b>, slower in liquids and <b>slowest in gases</b>.</li></ul><p>Rough speeds of sound: air ≈ <b>340 m/s</b> · water ≈ <b>1500 m/s</b> · steel ≈ <b>5000 m/s</b></p>' }],
      questions: [
        { type: 'choice', q: 'Why can sound NOT travel through a vacuum?', options: ['There are no particles to pass the vibrations on', 'A vacuum is too cold', 'A vacuum is too bright', 'Sound only travels in straight lines'], answer: 0, explain: 'Sound is particles vibrating and passing on the vibration — no particles, no sound.' },
        { type: 'type', q: 'The material that a sound wave travels through is called the _____.', answer: ['medium', 'a medium', 'the medium'], explain: 'Solids, liquids and gases are all mediums (media) for sound.' },
        { type: 'order', q: 'Put these in order from where sound travels FASTEST to SLOWEST.', items: ['Steel (solid)', 'Water (liquid)', 'Air (gas)'], explain: 'Closer particles pass vibrations on faster.' },
        { type: 'choice', q: 'Using particle theory, why does sound travel faster through solids than gases?', options: ['Particles in a solid are closer together, so vibrations are passed on more quickly', 'Particles in a solid are further apart, so there is more room to vibrate', 'Solids have no particles', 'Gases are heavier than solids'], answer: 0, explain: 'Tightly packed particles bump into neighbours almost immediately.' },
        { type: 'choice', q: 'Roughly how fast does sound travel in air?', options: ['340 m/s', '3 m/s', '300 000 000 m/s', '34 000 m/s'], answer: 0, explain: 'About 340 m/s — light is almost a million times faster.' },
        { type: 'sort', q: 'Which can travel through each of these?', buckets: ['Light and sound', 'Light only', 'Sound only'], items: [{ text: 'Air', bucket: 0 }, { text: 'Outer space (vacuum)', bucket: 1 }, { text: 'Clear water', bucket: 0 }, { text: 'A solid brick wall', bucket: 2 }], explain: 'Light needs no medium but can be blocked by opaque solids; sound needs particles.' },
        { type: 'choice', q: 'In a thunderstorm you see the lightning before you hear the thunder. Why?', options: ['Light travels much faster than sound', 'Sound travels faster than light', 'Thunder happens later', 'Your ears are slower than your eyes'], answer: 0, explain: 'They happen together, but light (300 000 000 m/s) beats sound (340 m/s).' }
      ]
    },
    {
      id: 'what-waves-do',
      emoji: '🌊',
      title: 'What Waves Transfer & Types of Wave',
      learn: [{ type: 'card', html: '<p class="progress-label">Core · Puk, Pul, Pur · Core+ · Puv, Puw</p><h3>⭐ Key knowledge: waves transfer energy</h3><ul><li>Waves transfer <b>energy</b> (and information) from one place to another — they do <b>not</b> transfer matter. A floating duck bobs up and down as a water wave passes, but it does not travel along with the wave.</li><li><b>Transverse waves:</b> the vibrations are at <b>right angles (90°)</b> to the direction the energy travels. Examples: light and all electromagnetic waves, ripples on water, a rope flicked up and down.</li><li><b>Longitudinal waves:</b> the vibrations are <b>parallel</b> (in the same direction) to the direction the energy travels. They have <b>compressions</b> (particles squashed together) and <b>rarefactions</b> (particles spread out). Example: <b>sound</b>, a slinky pushed and pulled.</li><li><b>Wave models:</b> a slinky spring models both types; a rope or ripple tank models transverse waves. Models help us see properties like amplitude, wavelength and frequency.</li><li>Energy transfer changes when the wave changes: a <b>bigger amplitude</b> or <b>higher frequency</b> wave carries more energy.</li></ul>' }],
      questions: [
        { type: 'choice', q: 'What do waves transfer?', options: ['Energy, not matter', 'Matter, not energy', 'Both energy and matter', 'Neither'], answer: 0, explain: 'The duck bobs up and down but stays where it is.' },
        { type: 'match', q: 'Match each term to its meaning.', pairs: [['Transverse', 'Vibrations at right angles to the energy direction'], ['Longitudinal', 'Vibrations parallel to the energy direction'], ['Compression', 'Particles squashed close together'], ['Rarefaction', 'Particles spread far apart']], explain: 'Compressions and rarefactions only appear in longitudinal waves.' },
        { type: 'sort', q: 'Sort the waves.', buckets: ['Transverse', 'Longitudinal'], items: [{ text: 'Light', bucket: 0 }, { text: 'Sound', bucket: 1 }, { text: 'Ripples on a pond', bucket: 0 }, { text: 'Slinky pushed and pulled', bucket: 1 }, { text: 'X-rays', bucket: 0 }], explain: 'All electromagnetic waves are transverse; sound is longitudinal.' },
        { type: 'choice', q: 'A ball floats on water as a wave passes. What happens to the ball?', options: ['It moves up and down but stays in roughly the same place', 'It is carried all the way to the shore by the wave', 'It sinks', 'It moves sideways only'], answer: 0, explain: 'Waves carry energy, not the water (or the ball) itself.' },
        { type: 'choice', q: 'Which model is best for showing a longitudinal wave?', options: ['A slinky spring pushed and pulled along its length', 'A rope flicked up and down', 'A ripple tank', 'A torch beam'], answer: 0, explain: 'Pushing a slinky makes compressions and rarefactions along it.' },
        { type: 'choice', q: 'Which change makes a wave carry MORE energy?', options: ['A bigger amplitude', 'A smaller amplitude', 'A lower frequency', 'Nothing can change it'], answer: 0, explain: 'Bigger vibrations (and higher frequency) mean more energy is transferred.' }
      ]
    },
    {
      id: 'amplitude-wavelength',
      emoji: '📏',
      title: 'Amplitude, Volume & Wavelength',
      learn: [{ type: 'card', html: '<p class="progress-label">Core · Pun, Ppo, Ppp, Ppq, Pup, Puo, Puq</p><h3>Parts of a wave</h3><svg viewBox="0 0 320 120" style="width:100%;max-width:420px" role="img" aria-label="Transverse wave with amplitude and wavelength labelled"><line x1="10" y1="60" x2="310" y2="60" stroke="#999" stroke-dasharray="4 4"/><path d="M10 60 Q 47 0 85 60 T 160 60 T 235 60 T 310 60" fill="none" stroke="#3a86ff" stroke-width="3"/><line x1="47" y1="60" x2="47" y2="30" stroke="#e63946" stroke-width="2"/><text x="52" y="45" font-size="11" fill="#e63946">amplitude</text><line x1="47" y1="108" x2="197" y2="108" stroke="#2a9d8f" stroke-width="2"/><line x1="47" y1="102" x2="47" y2="114" stroke="#2a9d8f" stroke-width="2"/><line x1="197" y1="102" x2="197" y2="114" stroke="#2a9d8f" stroke-width="2"/><text x="95" y="104" font-size="11" fill="#2a9d8f">wavelength</text><text x="36" y="22" font-size="10" fill="#666">crest</text><text x="110" y="100" font-size="10" fill="#666">trough</text></svg><ul><li><b>Amplitude:</b> the maximum height of the wave measured from the <b>middle (rest) line</b> to the top of a crest (or bottom of a trough). It measures the <b>size of the vibration</b>.</li><li><b>Volume</b> is how loud a sound is. Bigger vibration → bigger amplitude → <b>louder</b> sound. Small amplitude → quiet sound.</li><li><b>Wavelength (λ):</b> the distance from one point on a wave to the <b>same point on the next wave</b> (e.g. crest to crest). Measured in <b>metres (m)</b>.</li><li>⚠️ Common mistake: amplitude is NOT measured from crest to trough — that is twice the amplitude.</li></ul>' }],
      questions: [
        { type: 'choice', q: 'Amplitude is measured from…', options: ['The middle (rest) line to the top of a crest', 'The top of a crest to the bottom of a trough', 'One crest to the next crest', 'The start of the wave to the end'], answer: 0, explain: 'Crest-to-trough would be double the amplitude.' },
        { type: 'choice', q: 'What does the amplitude of a sound wave tell you?', options: ['How loud the sound is (volume)', 'How high the pitch is', 'How fast the sound travels', 'How long the sound lasts'], answer: 0, explain: 'Bigger vibration = bigger amplitude = louder.' },
        { type: 'type', q: 'The distance from one crest to the next crest is called the _____.', answer: ['wavelength', 'the wavelength'], explain: 'Wavelength is measured in metres and uses the symbol λ (lambda).' },
        { type: 'choice', q: 'You hit a drum harder. What happens?', options: ['Bigger vibrations, bigger amplitude, louder sound', 'Smaller vibrations, quieter sound', 'Higher pitch only', 'The sound travels faster'], answer: 0, explain: 'Size of vibration links to amplitude and volume.' },
        { type: 'choice', q: 'On a diagram the top of a crest is 3 cm above the rest line. What is the amplitude?', options: ['3 cm', '6 cm', '1.5 cm', '9 cm'], answer: 0, explain: 'Amplitude is from the rest line, so it is 3 cm (crest to trough would be 6 cm).' },
        { type: 'match', q: 'Match the term to what it measures.', pairs: [['Amplitude', 'Size of the vibration'], ['Wavelength', 'Distance between neighbouring crests'], ['Volume', 'How loud a sound is']], explain: 'Amplitude and volume are linked: more amplitude, more volume.' },
        { type: 'type', q: 'What unit is wavelength measured in? (the word)', answer: ['metres', 'meters', 'metre', 'meter', 'm'], explain: 'Wavelength is a distance, so it is in metres (m).' }
      ]
    },
    {
      id: 'frequency-pitch',
      emoji: '🎵',
      title: 'Frequency & Pitch',
      learn: [{ type: 'card', html: '<p class="progress-label">Core · Ppr, Pps, Pum, Ppt, Ppu</p><h3>How often does it vibrate?</h3><ul><li><b>Frequency</b> is the <b>number of waves</b> passing a point (or the number of vibrations) <b>every second</b>.</li><li>Frequency is measured in <b>Hertz (Hz)</b>. 1 Hz = 1 wave per second. 1 kHz = 1000 Hz.</li><li><b>Pitch</b> is how high or low a sound is. It depends on how <b>fast</b> the object vibrates.</li><li>Faster vibrations → <b>higher frequency</b> → <b>higher pitch</b> (squeaky). Slower vibrations → lower frequency → lower pitch (deep).</li><li>Higher frequency waves have a <b>shorter wavelength</b> (the waves are squashed closer together).</li><li>Humans can hear roughly <b>20 Hz to 20 000 Hz</b>.</li></ul><p>Remember: <b>amplitude ↔ volume</b> and <b>frequency ↔ pitch</b>.</p>' }],
      questions: [
        { type: 'choice', q: 'What does frequency measure?', options: ['The number of waves (vibrations) per second', 'The height of the wave', 'The distance between crests', 'How loud the sound is'], answer: 0, explain: 'Frequency = waves per second.' },
        { type: 'type', q: 'Frequency is measured in _____ (give the unit name).', answer: ['hertz', 'hz'], explain: 'Hertz (Hz) — 1 Hz is one wave every second.' },
        { type: 'choice', q: 'A guitar string vibrates faster. What happens to the sound?', options: ['The pitch gets higher', 'The pitch gets lower', 'It gets louder only', 'Nothing changes'], answer: 0, explain: 'Faster vibration = higher frequency = higher pitch.' },
        { type: 'choice', q: 'Which sound has the highest pitch?', options: ['5000 Hz', '500 Hz', '50 Hz', '5 Hz'], answer: 0, explain: 'Highest frequency = highest pitch.' },
        { type: 'match', q: 'Match the wave property to what you hear.', pairs: [['Large amplitude', 'Loud'], ['Small amplitude', 'Quiet'], ['High frequency', 'High pitch'], ['Low frequency', 'Low pitch']], explain: 'Amplitude → volume, frequency → pitch.' },
        { type: 'choice', q: 'If the frequency of a wave increases (same speed), the wavelength…', options: ['Gets shorter', 'Gets longer', 'Stays the same', 'Becomes zero'], answer: 0, explain: 'More waves squeezed into each second means each one is shorter.' },
        { type: 'choice', q: 'A wave makes 50 complete vibrations every second. Its frequency is…', options: ['50 Hz', '5 Hz', '500 Hz', '0.5 Hz'], answer: 0, explain: '50 waves per second = 50 Hz.' }
      ]
    },
    {
      id: 'wave-speed',
      emoji: '🧮',
      title: 'Wave Speed Calculations',
      learn: [{ type: 'card', html: '<p class="progress-label">Core+ · Pur, Pus, Puu, Pux</p><h3>The wave speed equation</h3><p style="font-size:1.3em;text-align:center"><b>wave speed = frequency × wavelength</b><br><b>v = f × λ</b></p><ul><li><b>v</b> = wave speed in metres per second (<b>m/s</b>)</li><li><b>f</b> = frequency in hertz (<b>Hz</b>)</li><li><b>λ</b> = wavelength in metres (<b>m</b>)</li></ul><h3>Formula triangle</h3><p style="text-align:center;font-size:1.2em">&nbsp;&nbsp;&nbsp;&nbsp;<b>v</b><br><b>f &nbsp;×&nbsp; λ</b></p><ul><li>Cover the one you want: <b>v = f × λ</b> · <b>f = v ÷ λ</b> · <b>λ = v ÷ f</b></li><li><b>Pick the equation:</b> look at which two measurements you are given (and their units), then cover up the one you need.</li><li>Wave speed is <b>how far the wave travels each second</b>.</li></ul><p>Worked example: f = 200 Hz, λ = 1.5 m → v = 200 × 1.5 = <b>300 m/s</b></p>' }],
      questions: [
        { type: 'choice', q: 'Which is the wave speed equation?', options: ['v = f × λ', 'v = f ÷ λ', 'v = f + λ', 'v = λ ÷ f'], answer: 0, explain: 'Speed = frequency × wavelength.' },
        { type: 'choice', q: 'A wave has frequency 10 Hz and wavelength 3 m. What is its speed?', options: ['30 m/s', '13 m/s', '3.3 m/s', '0.3 m/s'], answer: 0, explain: 'v = 10 × 3 = 30 m/s.' },
        { type: 'type', q: 'A sound wave has frequency 170 Hz and wavelength 2 m. What is its speed in m/s? (number only)', answer: ['340'], explain: 'v = 170 × 2 = 340 m/s — the speed of sound in air!' },
        { type: 'type', q: 'A water wave travels at 6 m/s with a wavelength of 2 m. What is its frequency in Hz? (number only)', answer: ['3'], explain: 'f = v ÷ λ = 6 ÷ 2 = 3 Hz.' },
        { type: 'type', q: 'A wave travels at 20 m/s with a frequency of 4 Hz. What is its wavelength in m? (number only)', answer: ['5'], explain: 'λ = v ÷ f = 20 ÷ 4 = 5 m.' },
        { type: 'match', q: 'Match each quantity to its unit.', pairs: [['Wave speed (v)', 'm/s'], ['Frequency (f)', 'Hz'], ['Wavelength (λ)', 'm']], explain: 'Check your units before you calculate.' },
        { type: 'choice', q: 'You are given the wave speed and the frequency. Which equation do you use?', options: ['λ = v ÷ f', 'v = f × λ', 'f = v ÷ λ', 'λ = f × v'], answer: 0, explain: 'You want wavelength, so cover λ in the triangle: v ÷ f.' },
        { type: 'choice', q: 'A radio wave has a frequency of 100 000 000 Hz and a wavelength of 3 m. What is its speed?', options: ['300 000 000 m/s', '33 333 333 m/s', '100 000 003 m/s', '3 m/s'], answer: 0, explain: 'v = 100 000 000 × 3 = 300 000 000 m/s — the speed of light. All EM waves travel at this speed.' }
      ]
    },
    {
      id: 'em-spectrum',
      emoji: '🌈',
      title: 'The Electromagnetic Spectrum',
      learn: [{ type: 'card', html: '<p class="progress-label">Core++ · Puy, Puz, Pva, Pvb, Pvc, Pvd, Pve, Pvf, Pvg, Pvh</p><h3>⭐ Key knowledge: the electromagnetic (EM) spectrum</h3><p>Seven groups of waves, in order from <b>longest wavelength / lowest frequency</b> to <b>shortest wavelength / highest frequency</b>:</p><p style="text-align:center;font-size:1.1em"><b>Radio → Microwaves → Infrared → Visible light → Ultraviolet → X-rays → Gamma rays</b></p><p>Mnemonic: <b>R</b>abbits <b>M</b>ate <b>I</b>n <b>V</b>ery <b>U</b>nusual e<b>X</b>pensive <b>G</b>ardens</p><ul><li><b>All EM waves have in common:</b> they are <b>transverse</b>, they can travel through a <b>vacuum</b>, they all travel at the <b>same speed</b> in a vacuum (300 000 000 m/s, the speed of light), and they all transfer energy.</li><li><b>Lowest frequency:</b> radio waves. <b>Highest frequency:</b> gamma rays.</li><li><b>Visible light</b> is in the middle — between infrared and ultraviolet. It is the only part our eyes can see (red has the longest wavelength, violet the shortest).</li><li>Going from radio → gamma: wavelength gets <b>shorter</b>, frequency gets <b>higher</b>, and energy gets <b>higher</b> (more dangerous).</li></ul>' }],
      questions: [
        { type: 'order', q: 'Put the EM spectrum in order, starting with the LOWEST frequency.', items: ['Radio waves', 'Microwaves', 'Infrared', 'Visible light', 'Ultraviolet', 'X-rays', 'Gamma rays'], explain: 'Rabbits Mate In Very Unusual eXpensive Gardens.' },
        { type: 'choice', q: 'Which part of the EM spectrum has the highest frequency?', options: ['Gamma rays', 'Radio waves', 'Visible light', 'Microwaves'], answer: 0, explain: 'Gamma rays: highest frequency, shortest wavelength, most energy.' },
        { type: 'choice', q: 'Which part of the EM spectrum has the lowest frequency?', options: ['Radio waves', 'Gamma rays', 'Ultraviolet', 'X-rays'], answer: 0, explain: 'Radio waves have the longest wavelength and lowest frequency.' },
        { type: 'choice', q: 'Visible light sits between which two groups?', options: ['Infrared and ultraviolet', 'Radio and microwaves', 'X-rays and gamma', 'Microwaves and X-rays'], answer: 0, explain: '…Infrared → Visible → Ultraviolet…' },
        { type: 'choice', q: 'Which is TRUE for ALL electromagnetic waves?', options: ['They travel at the same speed in a vacuum', 'They need a medium to travel through', 'They are longitudinal', 'They all have the same frequency'], answer: 0, explain: 'All EM waves are transverse and travel at 300 000 000 m/s in a vacuum.' },
        { type: 'choice', q: 'Moving from radio waves towards gamma rays, what happens?', options: ['Wavelength decreases, frequency and energy increase', 'Wavelength increases, frequency decreases', 'Everything stays the same', 'Frequency decreases, energy increases'], answer: 0, explain: 'Shorter wavelength ↔ higher frequency ↔ more energy.' },
        { type: 'sort', q: 'Sort by where they are in the spectrum compared with visible light.', buckets: ['Longer wavelength than visible', 'Shorter wavelength than visible'], items: [{ text: 'Radio waves', bucket: 0 }, { text: 'Infrared', bucket: 0 }, { text: 'Microwaves', bucket: 0 }, { text: 'Ultraviolet', bucket: 1 }, { text: 'X-rays', bucket: 1 }, { text: 'Gamma rays', bucket: 1 }], explain: 'Radio, microwave, IR are on the long side; UV, X-ray, gamma on the short side.' },
        { type: 'type', q: 'How many groups of waves make up the electromagnetic spectrum? (number)', answer: ['7', 'seven'], explain: 'Radio, micro, IR, visible, UV, X-ray, gamma.' }
      ]
    },
    {
      id: 'em-uses',
      emoji: '📡',
      title: 'Uses of Electromagnetic Waves',
      learn: [{ type: 'card', html: '<p class="progress-label">Core++ · Pvt, Pvq, Pvi, Pvj, Pvk, Pvl, Pvm, Pvn, Pvo, Pvp</p><h3>⭐ Key knowledge: different uses of waves in the EM spectrum</h3><ul><li>📻 <b>Radio waves:</b> TV and radio broadcasts, communication (walkie-talkies, Wi‑Fi uses radio/microwave frequencies).</li><li>🍿 <b>Microwaves:</b> microwave ovens (heating food), mobile phones, satellite communication, radar.</li><li>🔥 <b>Infrared:</b> TV remote controls, thermal-imaging cameras, toasters and grills, night-vision, heaters.</li><li>👀 <b>Visible light:</b> seeing, photography, fibre-optic cables (internet), lasers.</li><li>☀️ <b>Ultraviolet:</b> sun beds/tanning, security marker pens (glow under UV), killing bacteria (sterilising water), energy-efficient lights.</li><li>🦴 <b>X-rays:</b> seeing broken bones in hospitals, airport security bag scanners.</li><li>☢️ <b>Gamma rays:</b> killing cancer cells (radiotherapy), sterilising medical equipment, killing bacteria on food.</li></ul>' }],
      questions: [
        { type: 'match', q: 'Match each EM wave to a use.', pairs: [['Radio waves', 'Broadcasting TV and radio'], ['Microwaves', 'Heating food'], ['Infrared', 'TV remote control'], ['X-rays', 'Seeing broken bones'], ['Gamma rays', 'Killing cancer cells']], explain: 'Each part of the spectrum has different properties, so different uses.' },
        { type: 'choice', q: 'A security pen writes invisible ink that glows in special light. Which wave is used?', options: ['Ultraviolet', 'Radio waves', 'X-rays', 'Microwaves'], answer: 0, explain: 'UV makes the special ink fluoresce (glow).' },
        { type: 'choice', q: 'Thermal-imaging cameras detect…', options: ['Infrared', 'Gamma rays', 'Radio waves', 'Ultraviolet'], answer: 0, explain: 'Warm objects give out more infrared.' },
        { type: 'choice', q: 'Which wave is used by mobile phones and satellites?', options: ['Microwaves', 'Gamma rays', 'X-rays', 'Ultraviolet'], answer: 0, explain: 'Microwaves pass through the atmosphere well, so are good for satellites and phones.' },
        { type: 'sort', q: 'Sort the uses into the right wave.', buckets: ['Visible light', 'Gamma rays', 'Infrared'], items: [{ text: 'Fibre-optic internet cables', bucket: 0 }, { text: 'Sterilising surgical tools', bucket: 1 }, { text: 'Toaster', bucket: 2 }, { text: 'Photography', bucket: 0 }, { text: 'Radiotherapy', bucket: 1 }, { text: 'Night-vision goggles', bucket: 2 }], explain: 'Think about what each wave is good at.' },
        { type: 'choice', q: 'Airport bag scanners use…', options: ['X-rays', 'Radio waves', 'Infrared', 'Visible light'], answer: 0, explain: 'X-rays pass through soft materials but are stopped by dense ones like metal.' },
        { type: 'type', q: 'Name the EM wave used to broadcast radio programmes.', answer: ['radio', 'radio waves', 'radio wave'], explain: 'Radio waves — the lowest frequency part of the spectrum.' }
      ]
    },
    {
      id: 'em-dangers',
      emoji: '⚠️',
      title: 'Dangers of Electromagnetic Radiation',
      learn: [{ type: 'card', html: '<p class="progress-label">Core++ · Pwa, Pvu, Pvv, Pvw, Pvx, Pvy, Pvz</p><h3>⭐ Key knowledge: the dangers of EM radiation</h3><p>Higher frequency = more energy = more dangerous to body cells.</p><ul><li>🍿 <b>Microwaves:</b> can <b>heat</b> water inside body cells and cause internal burns (that is why microwave ovens have metal shielding).</li><li>🔥 <b>Infrared:</b> too much causes <b>skin burns</b>.</li><li>☀️ <b>Ultraviolet:</b> causes <b>sunburn</b>, damages the eyes (can lead to cataracts), causes skin to age early and can cause <b>skin cancer</b>.</li><li>🦴 <b>X-rays:</b> can damage cells and DNA, leading to <b>cancer</b> (mutations). Radiographers stand behind lead screens.</li><li>☢️ <b>Gamma rays:</b> very high energy — can <b>kill cells</b> or damage DNA and cause <b>cancer</b>.</li></ul><h3>Protecting against UV</h3><ul><li>Use <b>sun cream</b> with a high SPF · wear a <b>hat</b>, clothes that cover skin and <b>UV sunglasses</b> · stay in the <b>shade</b> around midday · avoid sun beds.</li></ul>' }],
      questions: [
        { type: 'match', q: 'Match each wave to the danger it can cause.', pairs: [['Microwaves', 'Heating of water in body cells (internal burns)'], ['Infrared', 'Skin burns'], ['Ultraviolet', 'Sunburn and skin cancer'], ['Gamma rays', 'Killing cells and causing cancer']], explain: 'The more energy a wave carries, the more damage it can do.' },
        { type: 'choice', q: 'Which of these does NOT protect you against UV radiation?', options: ['Using a sun bed', 'Wearing sun cream', 'Wearing a hat', 'Sitting in the shade'], answer: 0, explain: 'Sun beds give out UV — they increase the risk of skin cancer.' },
        { type: 'choice', q: 'Why do radiographers stand behind a lead screen when taking X-rays?', options: ['X-rays can damage cells and cause cancer, and lead absorbs them', 'To keep warm', 'Lead makes X-rays brighter', 'So the patient cannot see them'], answer: 0, explain: 'Repeated exposure to X-rays is dangerous; lead blocks them.' },
        { type: 'choice', q: 'Which EM wave is the MOST dangerous to the human body?', options: ['Gamma rays', 'Radio waves', 'Infrared', 'Visible light'], answer: 0, explain: 'Gamma has the highest frequency and the most energy.' },
        { type: 'sort', q: 'Is it a good way to protect yourself from UV?', buckets: ['Protects ✅', 'Does not protect ❌'], items: [{ text: 'SPF 50 sun cream', bucket: 0 }, { text: 'UV-blocking sunglasses', bucket: 0 }, { text: 'Lying in the sun at midday', bucket: 1 }, { text: 'Long-sleeved top and hat', bucket: 0 }, { text: 'Using a sun bed', bucket: 1 }], explain: 'Block or avoid the UV.' },
        { type: 'choice', q: 'Why does ultraviolet cause more harm than visible light?', options: ['It has a higher frequency, so it carries more energy', 'It has a longer wavelength', 'It travels faster than visible light', 'It is louder'], answer: 0, explain: 'All EM waves travel at the same speed — the difference is frequency and energy.' }
      ]
    }
  ]
});
