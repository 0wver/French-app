import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeftIcon, 
  CheckCircleIcon, 
  SpeakerWaveIcon,
  ArrowPathIcon,
  LightBulbIcon,
} from '@heroicons/react/24/outline';
import Card from '../components/Card';
import Button from '../components/Button';
import Badge from '../components/Badge';
import Progress from '../components/Progress';
import { useUserData } from '../contexts/UserDataContext';

const LessonPage = () => {
  const navigate = useNavigate();
  const { id: idParam } = useParams();
  const id = parseInt(idParam, 10);
  const { userData, updateProgress, updateStats, updateTimeDistribution, updateAccuracy } = useUserData();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [showHint, setShowHint] = useState(false);
  
  // Stats tracking
  const [startTime, setStartTime] = useState(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  
  // Start timer when lesson begins
  useEffect(() => {
    setStartTime(Date.now());
    
    // Cleanup function to handle if user leaves without completing
    return () => {
      if (startTime) {
        const timeSpent = Math.round((Date.now() - startTime) / 60000); // Convert to minutes
        if (timeSpent > 0) {
          // Track time even if lesson isn't completed
          updateTimeDistribution(lesson.category, timeSpent);
        }
      }
    };
  }, []);
  
  // Find the lesson from userData
  const findLesson = () => {
    // Search all course categories
    for (const category of Object.keys(userData.courses)) {
      const found = userData.courses[category].find(lesson => lesson.id === id);
      if (found) {
        // Return lesson with its category
        return { ...found, courseType: category };
      }
    }
    return null;
  };
  
  const lessonInfo = findLesson();
  
  // Redirect to courses page if lesson not found
  useEffect(() => {
    if (!lessonInfo && id) {
      navigate('/courses');
    }
  }, [lessonInfo, id, navigate]);
  
  // Sample lesson data based on ID
  // In a real app, this would come from an API or database
  const getLessonData = () => {
    // Lesson 1: Basic Greetings (Beginner)
    if (id === 1) {
      return {
        title: lessonInfo?.title || 'Basic Greetings',
        category: lessonInfo?.category || 'phrases',
        steps: [
          {
            type: 'intro',
            title: 'Common German Greetings',
            content: 'In this lesson, you will learn the most common German greetings used in everyday situations.',
          },
          {
            type: 'explanation',
            title: 'Formal Greetings',
            content: 'In German, we use "Guten Tag" (good day) during the day, and "Guten Abend" (good evening) in the evening.',
            examples: [
              { german: 'Guten Tag', english: 'Hello / Good day' },
              { german: 'Guten Abend', english: 'Good evening' },
              { german: 'Guten Morgen', english: 'Good morning' },
            ],
          },
          {
            type: 'practice',
            question: 'Which greeting would you use in the morning?',
            options: ['Guten Tag', 'Guten Abend', 'Guten Morgen', 'Gute Nacht'],
            correctAnswer: 'Guten Morgen',
            hint: 'Think about the time of day.',
            explanation: '"Guten Morgen" means "Good morning" and is used in the morning hours until around 11 AM.',
          },
          {
            type: 'explanation',
            title: 'Casual Greetings',
            content: 'For more casual situations, you can use "Hallo" which is similar to "Hi" in English.',
            examples: [
              { german: 'Hallo', english: 'Hi / Hey' },
              { german: 'Servus', english: 'Hi / Bye (Southern Germany/Austria)' },
              { german: 'Moin', english: 'Hello (Northern Germany)' },
            ],
          },
          {
            type: 'practice',
            question: 'Complete the dialogue: "_____, wie geht es Ihnen heute?"',
            options: ['Guten Tag', 'Auf Wiedersehen', 'Danke', 'Entschuldigung'],
            correctAnswer: 'Guten Tag',
            hint: 'This is how you would start a formal conversation during daytime.',
            explanation: '"Guten Tag" is used to greet someone formally. The phrase "Guten Tag, wie geht es Ihnen heute?" means "Hello, how are you today?" and is a common formal greeting in German.',
          },
          {
            type: 'practice',
            question: 'Which greeting would be INAPPROPRIATE to use when meeting your professor?',
            options: ['Guten Tag Herr Professor', 'Hallo', 'Guten Tag Frau Professorin', 'Guten Abend Professor'],
            correctAnswer: 'Hallo',
            hint: 'Think about the level of formality required in an academic setting.',
            explanation: '"Hallo" is a casual greeting used among friends and peers. When addressing a professor, it\'s more appropriate to use formal greetings like "Guten Tag Herr Professor/Frau Professorin" or "Guten Abend Professor" in the evening.',
          },
          {
            type: 'explanation',
            title: 'Saying Goodbye',
            content: 'To say goodbye in German, the most common expression is "Auf Wiedersehen".',
            examples: [
              { german: 'Auf Wiedersehen', english: 'Goodbye (formal)' },
              { german: 'Tschüss', english: 'Bye (informal)' },
              { german: 'Bis bald', english: 'See you soon' },
              { german: 'Bis morgen', english: 'See you tomorrow' },
            ],
          },
          {
            type: 'practice',
            question: 'When leaving a shop in the evening, what would be the most appropriate thing to say?',
            options: ['Guten Tag', 'Bis morgen', 'Auf Wiedersehen', 'Bis nächste Woche'],
            correctAnswer: 'Auf Wiedersehen',
            hint: 'You need a general farewell that doesn\'t imply you\'ll return at a specific time.',
            explanation: '"Auf Wiedersehen" is the standard way to say goodbye in most situations. "Bis morgen" (see you tomorrow) and "Bis nächste Woche" (see you next week) suggest specific timeframes for meeting again, which wouldn\'t be appropriate when leaving a shop unless you specifically plan to return then.',
          },
          {
            type: 'practice',
            question: 'Match the appropriate response: "Hallo, wie geht\'s?" - "_____"',
            options: ['Vielen Dank', 'Gut, danke. Und dir?', 'Auf Wiedersehen', 'Ich verstehe nicht'],
            correctAnswer: 'Gut, danke. Und dir?',
            hint: 'When someone asks how you\'re doing, what would be a natural way to respond and ask the same in return?',
            explanation: 'When someone asks "Wie geht\'s?" (How\'s it going?), the typical response is "Gut, danke" (Good, thanks) followed by "Und dir?" (and you?) to reciprocate the question. This maintains the flow of conversation.',
          },
          {
            type: 'completion',
            title: 'Well Done!',
            content: 'You\'ve completed the Basic Greetings lesson. You now know the most important German greetings!',
            summary: [
              'How to say hello formally with "Guten Tag", "Guten Morgen", and "Guten Abend"',
              'Using "Hallo" and other casual greetings with friends',
              'Saying goodbye with "Auf Wiedersehen" and time-specific farewells',
              'Responding to "Wie geht\'s?" appropriately in conversation'
            ]
          },
        ],
      };
    } 
    // Lesson 2: Numbers 1-20 (Beginner)
    else if (id === 2) {
      return {
        title: lessonInfo?.title || 'Numbers 1-20',
        category: lessonInfo?.category || 'vocabulary',
        steps: [
          {
            type: 'intro',
            title: 'German Numbers 1-20',
            content: 'In this lesson, you will learn how to count from 1 to 20 in German.'
          },
          {
            type: 'explanation',
            title: 'Numbers 1-10',
            content: 'Let\'s start with the numbers from 1 to 10:',
            examples: [
              { german: 'eins', english: '1' },
              { german: 'zwei', english: '2' },
              { german: 'drei', english: '3' },
              { german: 'vier', english: '4' },
              { german: 'fünf', english: '5' },
              { german: 'sechs', english: '6' },
              { german: 'sieben', english: '7' },
              { german: 'acht', english: '8' },
              { german: 'neun', english: '9' },
              { german: 'zehn', english: '10' },
            ],
          },
          {
            type: 'practice',
            question: 'What is the German word for the number 7?',
            options: ['sechs', 'sieben', 'acht', 'neun'],
            correctAnswer: 'sieben',
            hint: 'Count up from 1: eins, zwei, drei, vier, fünf, sechs, ...',
            explanation: '"Sieben" is the German word for the number 7.',
          },
          {
            type: 'explanation',
            title: 'Numbers 11-20',
            content: 'Now let\'s learn the numbers from 11 to 20:',
            examples: [
              { german: 'elf', english: '11' },
              { german: 'zwölf', english: '12' },
              { german: 'dreizehn', english: '13' },
              { german: 'vierzehn', english: '14' },
              { german: 'fünfzehn', english: '15' },
              { german: 'sechzehn', english: '16' },
              { german: 'siebzehn', english: '17' },
              { german: 'achtzehn', english: '18' },
              { german: 'neunzehn', english: '19' },
              { german: 'zwanzig', english: '20' },
            ],
          },
          {
            type: 'practice',
            question: 'Which of these is the correct German word for 15?',
            options: ['fünfzig', 'fünfzehn', 'fünf', 'fünfundzwanzig'],
            correctAnswer: 'fünfzehn',
            hint: 'For numbers 13-19, the pattern is usually the number + "zehn" (ten).',
            explanation: '"Fünfzehn" is the German word for 15. It combines "fünf" (5) and "zehn" (10).',
          },
          {
            type: 'practice',
            question: 'What is the correct sequence of numbers in German?',
            options: ['eins, drei, fünf, sieben', 'zwei, vier, sechs, zehn', 'eins, zwei, drei, fünf', 'zehn, neun, acht, sieben'],
            correctAnswer: 'eins, drei, fünf, sieben',
            hint: 'Look for the sequence of odd numbers.',
            explanation: 'The sequence "eins, drei, fünf, sieben" represents the odd numbers 1, 3, 5, 7 in German.',
          },
          {
            type: 'practice',
            question: 'Complete the sequence: "dreizehn, vierzehn, _____, sechzehn"',
            options: ['siebzehn', 'fünf', 'fünfzig', 'fünfzehn'],
            correctAnswer: 'fünfzehn',
            hint: 'You need the number that comes after 14 and before 16.',
            explanation: 'The sequence is counting from 13 to 16, so the missing number is "fünfzehn" (15).',
          },
          {
            type: 'completion',
            title: 'Well Done!',
            content: 'You\'ve completed the Numbers 1-20 lesson. You can now count in German!',
            summary: [
              'Numbers 1-10 in German',
              'Numbers 11-20 in German',
              'Patterns in number formation',
              'Counting sequence in German'
            ]
          },
        ],
      };
    }
    // Lesson 3: Basic Phrases (Beginner)
    else if (id === 3) {
      return {
        title: lessonInfo?.title || 'Basic Phrases',
        category: lessonInfo?.category || 'phrases',
        steps: [
          {
            type: 'intro',
            title: 'Essential German Phrases',
            content: 'In this lesson, you will learn essential German phrases for everyday situations.',
          },
          {
            type: 'explanation',
            title: 'Polite Expressions',
            content: 'These phrases will help you be polite in German:',
            examples: [
              { german: 'Bitte', english: 'Please / You\'re welcome' },
              { german: 'Danke', english: 'Thank you' },
              { german: 'Vielen Dank', english: 'Thank you very much' },
              { german: 'Entschuldigung', english: 'Excuse me / Sorry' },
            ],
          },
          {
            type: 'practice',
            question: 'How do you say "Thank you very much" in German?',
            options: ['Danke schön', 'Bitte', 'Vielen Dank', 'Entschuldigung'],
            correctAnswer: 'Vielen Dank',
            hint: 'It\'s a stronger version of "Danke".',
            explanation: '"Vielen Dank" means "Thank you very much" and is used to express stronger gratitude than just "Danke".',
          },
          {
            type: 'explanation',
            title: 'Asking Basic Questions',
            content: 'Here are some useful question phrases:',
            examples: [
              { german: 'Wie heißen Sie?', english: 'What is your name? (formal)' },
              { german: 'Wie heißt du?', english: 'What is your name? (informal)' },
              { german: 'Woher kommen Sie?', english: 'Where are you from? (formal)' },
              { german: 'Woher kommst du?', english: 'Where are you from? (informal)' },
              { german: 'Sprechen Sie Englisch?', english: 'Do you speak English? (formal)' },
            ],
          },
          {
            type: 'practice',
            question: 'Which phrase would you use to ask someone\'s name informally?',
            options: ['Wie heißen Sie?', 'Wie heißt du?', 'Wer bist du?', 'Wie ist Ihr Name?'],
            correctAnswer: 'Wie heißt du?',
            hint: 'Look for the informal "du" form rather than the formal "Sie" form.',
            explanation: '"Wie heißt du?" is the informal way to ask "What is your name?" in German. You would use this with friends, family, children, or peers.',
          },
          {
            type: 'practice',
            question: 'How would you ask if someone speaks English in a formal situation?',
            options: ['Sprichst du Englisch?', 'Sprechen Sie Englisch?', 'Kannst du Englisch?', 'Englisch, bitte?'],
            correctAnswer: 'Sprechen Sie Englisch?',
            hint: 'Look for the formal "Sie" form.',
            explanation: '"Sprechen Sie Englisch?" is the formal way to ask "Do you speak English?" in German. You would use this with strangers, older people, or in professional settings.',
          },
          {
            type: 'explanation',
            title: 'Basic Responses',
            content: 'Here are some common responses:',
            examples: [
              { german: 'Ja', english: 'Yes' },
              { german: 'Nein', english: 'No' },
              { german: 'Vielleicht', english: 'Maybe' },
              { german: 'Ich verstehe nicht', english: 'I don\'t understand' },
              { german: 'Ich weiß nicht', english: 'I don\'t know' },
            ],
          },
          {
            type: 'practice',
            question: 'What does "Ich verstehe nicht" mean?',
            options: ['I agree', 'I don\'t know', 'I don\'t understand', 'I don\'t want to'],
            correctAnswer: 'I don\'t understand',
            hint: '"Verstehen" means "to understand" in German.',
            explanation: '"Ich verstehe nicht" literally means "I understand not" and is used to say "I don\'t understand" in German.',
          },
          {
            type: 'completion',
            title: 'Well Done!',
            content: 'You\'ve completed the Basic Phrases lesson. You now know essential German phrases for everyday communication!',
            summary: [
              'Polite expressions like "Bitte" and "Danke"',
              'How to ask basic questions formally and informally',
              'Common responses in German',
              'Useful phrases for when you don\'t understand'
            ]
          },
        ],
      };
    }
    // Lesson 4: Numbers & Counting (Beginner)
    else if (id === 4) {
      return {
        title: lessonInfo?.title || 'Numbers & Counting',
        category: lessonInfo?.category || 'vocabulary',
        steps: [
          {
            type: 'intro',
            title: 'German Numbers & Counting',
            content: 'In this lesson, you will learn how to count in German and use numbers in everyday conversations.',
          },
          {
            type: 'explanation',
            title: 'Numbers 1-20',
            content: 'Let\'s review the numbers from 1 to 20 in German:',
            examples: [
              { german: 'eins', english: '1' },
              { german: 'zwei', english: '2' },
              { german: 'drei', english: '3' },
              { german: 'vier', english: '4' },
              { german: 'fünf', english: '5' },
              { german: 'sechs', english: '6' },
              { german: 'sieben', english: '7' },
              { german: 'acht', english: '8' },
              { german: 'neun', english: '9' },
              { german: 'zehn', english: '10' },
              { german: 'elf', english: '11' },
              { german: 'zwölf', english: '12' },
              { german: 'dreizehn', english: '13' },
              { german: 'vierzehn', english: '14' },
              { german: 'fünfzehn', english: '15' },
              { german: 'sechzehn', english: '16' },
              { german: 'siebzehn', english: '17' },
              { german: 'achtzehn', english: '18' },
              { german: 'neunzehn', english: '19' },
              { german: 'zwanzig', english: '20' },
            ],
          },
          {
            type: 'practice',
            question: 'What is the German word for the number 7?',
            options: ['sechs', 'sieben', 'acht', 'neun'],
            correctAnswer: 'sieben',
            hint: 'Count up from 1: eins, zwei, drei, vier, fünf, sechs, ...',
            explanation: '\'Sieben\' is the German word for the number 7.',
          },
          {
            type: 'explanation',
            title: 'Numbers 21-100',
            content: 'For numbers 21-99, German uses a different pattern than English. The ones digit comes first, followed by \'und\' (and), and then the tens digit:',
            examples: [
              { german: 'einundzwanzig', english: '21 (one-and-twenty)' },
              { german: 'zweiunddreißig', english: '32 (two-and-thirty)' },
              { german: 'fünfundvierzig', english: '45 (five-and-forty)' },
              { german: 'siebenundfünfzig', english: '57 (seven-and-fifty)' },
              { german: 'neunundneunzig', english: '99 (nine-and-ninety)' },
            ],
          },
          {
            type: 'practice',
            question: 'How do you say 42 in German?',
            options: ['vierzig', 'zweiundvierzig', 'vierundzwanzig', 'zweiundzwanzig'],
            correctAnswer: 'zweiundvierzig',
            hint: 'Remember the pattern: ones digit + und + tens digit',
            explanation: '\'Zweiundvierzig\' means 42. It combines \'zwei\' (2), \'und\' (and), and \'vierzig\' (40).',
          },
          {
            type: 'completion',
            title: 'Well Done!',
            content: 'You\'ve completed the Numbers & Counting lesson. You can now count in German!',
            summary: [
              'Numbers 1-20 in German',
              'The pattern for forming numbers 21-99',
              'How to use numbers in everyday situations',
              'Counting sequence in German'
            ]
          },
        ],
      };
    }
    // Lesson 5: Present Tense Verbs (Beginner-Intermediate)
    else if (id === 5) {
      return {
        title: lessonInfo?.title || 'Present Tense Verbs',
        category: lessonInfo?.category || 'grammar',
        steps: [
          {
            type: 'intro',
            title: 'Present Tense in German',
            content: 'In this lesson, you will learn how to conjugate regular verbs in the present tense in German.'
          },
          {
            type: 'explanation',
            title: 'Regular Verbs in German',
            content: 'German has regular (weak) verbs that follow consistent conjugation patterns in the present tense. Most German verbs are regular and follow predictable rules.',
            examples: [
              { german: 'spielen (to play)', english: 'ich spiele, du spielst, er/sie/es spielt, wir spielen, ihr spielt, sie/Sie spielen' },
              { german: 'machen (to do/make)', english: 'ich mache, du machst, er/sie/es macht, wir machen, ihr macht, sie/Sie machen' },
            ],
          },
          {
            type: 'practice',
            question: 'Complete the conjugation: "Du _____ Deutsch." (sprechen)',
            options: ['sprecht', 'sprichst', 'spreche', 'sprechen'],
            correctAnswer: 'sprichst',
            hint: 'Remember the ending for "du" form with regular verbs.',
            explanation: 'With regular verbs, the "du" form ends in -st. So "Du sprichst Deutsch" means "You speak German" (informal singular you). Note that "sprechen" has a vowel change in some forms.',
          },
          {
            type: 'explanation',
            title: 'Stem-Changing Verbs',
            content: 'Some German verbs change their stem vowel in the second and third person singular forms (du, er/sie/es).',
            examples: [
              { german: 'sprechen (to speak)', english: 'ich spreche, du sprichst, er/sie/es spricht, wir sprechen, ihr sprecht, sie/Sie sprechen' },
              { german: 'lesen (to read)', english: 'ich lese, du liest, er/sie/es liest, wir lesen, ihr lest, sie/Sie lesen' },
            ],
          },
          {
            type: 'practice',
            question: 'Complete the conjugation: "Er _____ ein Buch." (lesen)',
            options: ['lest', 'liest', 'lese', 'lesen'],
            correctAnswer: 'liest',
            hint: 'This is a stem-changing verb where e → ie in the third person singular.',
            explanation: 'The verb "lesen" (to read) changes its stem vowel from "e" to "ie" in the second and third person singular forms. So "Er liest ein Buch" means "He reads a book."',
          },
          {
            type: 'practice',
            question: 'Which is the correct conjugation of "arbeiten" (to work) for "wir"?',
            options: ['arbeite', 'arbeitest', 'arbeitet', 'arbeiten'],
            correctAnswer: 'arbeiten',
            hint: 'Think about the ending for the "wir" (we) form.',
            explanation: 'For "wir" (we), regular verbs end with -en. So "Wir arbeiten" means "We work."',
          },
          {
            type: 'completion',
            title: 'Well Done!',
            content: 'You\'ve completed the Present Tense Verbs lesson. You now understand how to conjugate regular and stem-changing verbs in German!',
            summary: [
              'Regular verb conjugation patterns',
              'Stem-changing verbs (e → i/ie)',
              'Personal pronouns and their verb endings',
              'Present tense usage in German'
            ]
          },
        ],
      };
    }
    // Lesson 6: Family Members (Beginner-Intermediate)
    else if (id === 6) {
      return {
        title: lessonInfo?.title || 'Family Members',
        category: lessonInfo?.category || 'vocabulary',
        steps: [
          {
            type: 'intro',
            title: 'Family Vocabulary in German',
            content: 'In this lesson, you will learn vocabulary for family members in German.'
          },
          {
            type: 'explanation',
            title: 'Immediate Family',
            content: 'Here are the terms for immediate family members:',
            examples: [
              { german: 'die Mutter', english: 'mother' },
              { german: 'der Vater', english: 'father' },
              { german: 'die Eltern', english: 'parents' },
              { german: 'die Schwester', english: 'sister' },
              { german: 'der Bruder', english: 'brother' },
              { german: 'die Geschwister', english: 'siblings' },
            ],
          },
          {
            type: 'practice',
            question: 'What is the German word for "brother"?',
            options: ['der Vater', 'der Bruder', 'die Schwester', 'der Sohn'],
            correctAnswer: 'der Bruder',
            hint: 'This is a male sibling.',
            explanation: '"Der Bruder" means "brother" in German. Note that it uses the masculine article "der."',
          },
          {
            type: 'explanation',
            title: 'Extended Family',
            content: 'Here are terms for extended family members:',
            examples: [
              { german: 'die Großmutter / die Oma', english: 'grandmother' },
              { german: 'der Großvater / der Opa', english: 'grandfather' },
              { german: 'die Großeltern', english: 'grandparents' },
              { german: 'die Tante', english: 'aunt' },
              { german: 'der Onkel', english: 'uncle' },
              { german: 'die Cousine', english: 'female cousin' },
              { german: 'der Cousin', english: 'male cousin' },
            ],
          },
          {
            type: 'practice',
            question: 'What is the German word for "grandparents"?',
            options: ['die Eltern', 'die Großeltern', 'die Geschwister', 'die Familie'],
            correctAnswer: 'die Großeltern',
            hint: 'Think about the word for "parents" and add the prefix for "grand."',
            explanation: '"Die Großeltern" means "grandparents" in German. It combines "groß" (grand) with "Eltern" (parents).',
          },
          {
            type: 'practice',
            question: 'Complete the sentence: "Meine _____ heißt Maria." (referring to your mother\'s sister)',
            options: ['Mutter', 'Schwester', 'Tante', 'Cousine'],
            correctAnswer: 'Tante',
            hint: 'This is your parent\'s sister.',
            explanation: '"Meine Tante heißt Maria" means "My aunt is named Maria." Your aunt is your mother\'s or father\'s sister.',
          },
          {
            type: 'completion',
            title: 'Well Done!',
            content: 'You\'ve completed the Family Members lesson. You now know the German vocabulary for immediate and extended family!',
            summary: [
              'Terms for immediate family members',
              'Terms for extended family members',
              'Gender of family-related nouns',
              'Formal and informal terms for grandparents'
            ]
          },
        ],
      };
    }
    // Lesson 7: Telling Time (Intermediate)
    else if (id === 7) {
      return {
        title: lessonInfo?.title || 'Telling Time',
        category: lessonInfo?.category || 'phrases',
        steps: [
          {
            type: 'intro',
            title: 'Telling Time in German',
            content: 'In this lesson, you will learn how to tell time in German.'
          },
          {
            type: 'explanation',
            title: 'Asking for the Time',
            content: 'Here\'s how to ask for the time in German:',
            examples: [
              { german: 'Wie spät ist es?', english: 'What time is it?' },
              { german: 'Wie viel Uhr ist es?', english: 'What time is it?' },
              { german: 'Haben Sie die Uhrzeit?', english: 'Do you have the time? (formal)' },
            ],
          },
          {
            type: 'practice',
            question: 'How would you ask "What time is it?" in German?',
            options: ['Wie alt bist du?', 'Wie spät ist es?', 'Wie geht es dir?', 'Wie heißt du?'],
            correctAnswer: 'Wie spät ist es?',
            hint: 'Literally translates to "How late is it?"',
            explanation: '"Wie spät ist es?" is the most common way to ask for the time in German. It literally means "How late is it?"',
          },
          {
            type: 'explanation',
            title: 'Hours',
            content: 'To express full hours in German:',
            examples: [
              { german: 'Es ist ein Uhr.', english: 'It\'s one o\'clock.' },
              { german: 'Es ist zwei Uhr.', english: 'It\'s two o\'clock.' },
              { german: 'Es ist zwölf Uhr.', english: 'It\'s twelve o\'clock.' },
            ],
          },
          {
            type: 'practice',
            question: 'How would you say "It\'s five o\'clock" in German?',
            options: ['Es ist fünf.', 'Es ist fünf Uhr.', 'Es ist fünf Stunden.', 'Fünf Uhr.'],
            correctAnswer: 'Es ist fünf Uhr.',
            hint: 'Remember to include the word for "o\'clock."',
            explanation: '"Es ist fünf Uhr" is the correct way to say "It\'s five o\'clock" in German. "Uhr" means "o\'clock" or "clock."',
          },
          {
            type: 'explanation',
            title: 'Minutes',
            content: 'To express minutes in German:',
            examples: [
              { german: 'Es ist drei Uhr fünfzehn.', english: 'It\'s 3:15.' },
              { german: 'Es ist Viertel nach drei.', english: 'It\'s quarter past three.' },
              { german: 'Es ist halb vier.', english: 'It\'s half past three. (literally: half to four)' },
              { german: 'Es ist drei Uhr fünfundvierzig.', english: 'It\'s 3:45.' },
              { german: 'Es ist Viertel vor vier.', english: 'It\'s quarter to four.' },
            ],
          },
          {
            type: 'practice',
            question: 'What does "Es ist halb acht" mean?',
            options: ['It\'s 8:00', 'It\'s 8:30', 'It\'s 7:30', 'It\'s 7:00'],
            correctAnswer: 'It\'s 7:30',
            hint: 'In German, "halb" (half) refers to the upcoming hour.',
            explanation: '"Es ist halb acht" literally means "It\'s half to eight" but translates to "It\'s 7:30" in English. In German, "halb" (half) refers to the half hour before the stated hour.',
          },
          {
            type: 'practice',
            question: 'How would you say "It\'s quarter past nine" in German?',
            options: ['Es ist Viertel nach neun.', 'Es ist Viertel vor neun.', 'Es ist halb neun.', 'Es ist neun Viertel.'],
            correctAnswer: 'Es ist Viertel nach neun.',
            hint: 'Think about the words for "quarter" and "past."',
            explanation: '"Es ist Viertel nach neun" means "It\'s quarter past nine." "Viertel" means "quarter" and "nach" means "past" or "after."',
          },
          {
            type: 'completion',
            title: 'Well Done!',
            content: 'You\'ve completed the Telling Time lesson. You now know how to ask for and tell time in German!',
            summary: [
              'How to ask for the time',
              'Expressing full hours',
              'Expressing minutes and quarter hours',
              'Understanding the German "half to" concept'
            ]
          },
        ],
      };
    }
    // Lesson 8: Modal Verbs (Intermediate)
    else if (id === 8) {
      return {
        title: lessonInfo?.title || 'Modal Verbs',
        category: lessonInfo?.category || 'grammar',
        steps: [
          {
            type: 'intro',
            title: 'Modal Verbs in German',
            content: 'In this lesson, you will learn about modal verbs in German, which express ability, necessity, permission, etc.'
          },
          {
            type: 'explanation',
            title: 'Common Modal Verbs',
            content: 'Here are the most common modal verbs in German:',
            examples: [
              { german: 'können', english: 'can, to be able to' },
              { german: 'müssen', english: 'must, to have to' },
              { german: 'dürfen', english: 'may, to be allowed to' },
              { german: 'sollen', english: 'should, ought to' },
              { german: 'wollen', english: 'to want to' },
              { german: 'mögen/möchten', english: 'to like/would like to' },
            ],
          },
          {
            type: 'practice',
            question: 'What does the modal verb "können" mean?',
            options: ['must, to have to', 'can, to be able to', 'may, to be allowed to', 'to want to'],
            correctAnswer: 'can, to be able to',
            hint: 'This verb expresses ability.',
            explanation: '"Können" means "can" or "to be able to" in German. It\'s used to express ability or possibility.',
          },
          {
            type: 'explanation',
            title: 'Modal Verb Conjugation',
            content: 'Modal verbs have irregular conjugations in the present tense:',
            examples: [
              { german: 'können: ich kann, du kannst, er/sie/es kann, wir können, ihr könnt, sie/Sie können', english: 'can/to be able to' },
              { german: 'müssen: ich muss, du musst, er/sie/es muss, wir müssen, ihr müsst, sie/Sie müssen', english: 'must/to have to' },
            ],
          },
          {
            type: 'practice',
            question: 'Complete the sentence: "Ich _____ Deutsch lernen." (want to)',
            options: ['kann', 'muss', 'will', 'darf'],
            correctAnswer: 'will',
            hint: 'This is the conjugated form of "wollen" (to want to) for "ich."',
            explanation: '"Ich will Deutsch lernen" means "I want to learn German." "Will" is the first-person singular form of "wollen" (to want to).',
          },
          {
            type: 'explanation',
            title: 'Sentence Structure with Modal Verbs',
            content: 'In German, when using modal verbs, the main verb goes to the end of the clause in its infinitive form:',
            examples: [
              { german: 'Ich kann Deutsch sprechen.', english: 'I can speak German.' },
              { german: 'Du musst jetzt gehen.', english: 'You must go now.' },
              { german: 'Er will ein Buch lesen.', english: 'He wants to read a book.' },
            ],
          },
          {
            type: 'practice',
            question: 'Which sentence has the correct word order with a modal verb?',
            options: ['Ich sprechen kann Deutsch.', 'Ich kann sprechen Deutsch.', 'Ich kann Deutsch sprechen.', 'Ich Deutsch kann sprechen.'],
            correctAnswer: 'Ich kann Deutsch sprechen.',
            hint: 'Remember that the infinitive verb goes to the end of the clause.',
            explanation: '"Ich kann Deutsch sprechen" has the correct word order. The modal verb "kann" is in the second position (conjugated), and the main verb "sprechen" is in the infinitive form at the end of the clause.',
          },
          {
            type: 'practice',
            question: 'Complete the sentence: "Wir _____ heute nicht arbeiten." (don\'t have to)',
            options: ['können', 'müssen', 'müssen nicht', 'nicht müssen'],
            correctAnswer: 'müssen nicht',
            hint: 'Think about the position of the negation with modal verbs.',
            explanation: '"Wir müssen nicht heute arbeiten" means "We don\'t have to work today." In German, the negation "nicht" comes after the modal verb, not before it.',
          },
          {
            type: 'completion',
            title: 'Well Done!',
            content: 'You\'ve completed the Modal Verbs lesson. You now understand how to use modal verbs in German!',
            summary: [
              'Common modal verbs and their meanings',
              'Modal verb conjugation patterns',
              'Sentence structure with modal verbs',
              'Negation with modal verbs'
            ]
          },
        ],
      };
    }
    // Lesson 9: Dative Case (Intermediate-Advanced)
    else if (id === 9) {
      return {
        title: lessonInfo?.title || 'Dative Case',
        category: lessonInfo?.category || 'grammar',
        steps: [
          {
            type: 'intro',
            title: 'The Dative Case in German',
            content: 'In this lesson, you will learn about the dative case in German, which is used for indirect objects and after certain prepositions.'
          },
          {
            type: 'explanation',
            title: 'Dative Articles',
            content: 'Here are the definite and indefinite articles in the dative case:',
            examples: [
              { german: 'der → dem (masculine)', english: 'the → to/for the' },
              { german: 'die → der (feminine)', english: 'the → to/for the' },
              { german: 'das → dem (neuter)', english: 'the → to/for the' },
              { german: 'die → den + n (plural)', english: 'the → to/for the' },
              { german: 'ein → einem (masculine)', english: 'a → to/for a' },
              { german: 'eine → einer (feminine)', english: 'a → to/for a' },
              { german: 'ein → einem (neuter)', english: 'a → to/for a' },
            ],
          },
          {
            type: 'practice',
            question: 'What is the dative form of the definite article "die" (feminine)?',
            options: ['dem', 'den', 'der', 'das'],
            correctAnswer: 'der',
            hint: 'The feminine definite article changes in the dative case.',
            explanation: 'The definite article "die" (feminine) changes to "der" in the dative case. For example: "Ich gebe der Frau ein Buch" (I give the woman a book).',
          },
          {
            type: 'explanation',
            title: 'Dative Prepositions',
            content: 'These prepositions always take the dative case:',
            examples: [
              { german: 'aus', english: 'from, out of' },
              { german: 'bei', english: 'at, near' },
              { german: 'mit', english: 'with' },
              { german: 'nach', english: 'after, to (for places)' },
              { german: 'von', english: 'from, of' },
              { german: 'zu', english: 'to' },
            ],
          },
          {
            type: 'practice',
            question: 'Complete the sentence with the correct dative form: "Ich fahre mit _____ Bus." (the)',
            options: ['der', 'dem', 'den', 'das'],
            correctAnswer: 'dem',
            hint: '"Bus" is masculine, and "mit" always takes the dative case.',
            explanation: '"Ich fahre mit dem Bus" means "I\'m going by bus." "Mit" is a dative preposition, and "der Bus" (masculine) becomes "dem Bus" in the dative case.',
          },
          {
            type: 'explanation',
            title: 'Indirect Objects',
            content: 'The dative case is used for indirect objects (the recipient of an action):',
            examples: [
              { german: 'Ich gebe dem Mann das Buch.', english: 'I give the man the book.' },
              { german: 'Sie schreibt ihrer Mutter einen Brief.', english: 'She writes her mother a letter.' },
              { german: 'Er kauft seinem Sohn ein Geschenk.', english: 'He buys his son a gift.' },
            ],
          },
          {
            type: 'practice',
            question: 'Complete the sentence with the correct dative form: "Er gibt _____ Kind ein Geschenk." (the)',
            options: ['das', 'dem', 'den', 'der'],
            correctAnswer: 'dem',
            hint: '"Kind" is neuter, and the indirect object takes the dative case.',
            explanation: '"Er gibt dem Kind ein Geschenk" means "He gives the child a gift." "Das Kind" (neuter) becomes "dem Kind" in the dative case when it functions as the indirect object.',
          },
          {
            type: 'completion',
            title: 'Well Done!',
            content: 'You\'ve completed the Dative Case lesson. You now understand how to use the dative case in German!',
            summary: [
              'Dative case articles and their forms',
              'Prepositions that always take the dative case',
              'Using the dative case for indirect objects',
              'Forming dative constructions in sentences'
            ]
          },
        ],
      };
    }
    // Lesson 10: Past Tense (Intermediate-Advanced)
    else if (id === 10) {
      return {
        title: lessonInfo?.title || 'Past Tense',
        category: lessonInfo?.category || 'grammar',
        steps: [
          {
            type: 'intro',
            title: 'Past Tense in German',
            content: 'In this lesson, you will learn about the two main past tenses in German: the perfect tense (Perfekt) and the simple past (Präteritum).'
          },
          {
            type: 'explanation',
            title: 'Perfect Tense (Perfekt)',
            content: 'The perfect tense is formed with a present tense auxiliary verb (haben or sein) and the past participle of the main verb:',
            examples: [
              { german: 'Ich habe gegessen.', english: 'I have eaten / I ate.' },
              { german: 'Du hast geschlafen.', english: 'You have slept / You slept.' },
              { german: 'Er ist gefahren.', english: 'He has gone / He went.' },
            ],
          },
          {
            type: 'practice',
            question: 'Which auxiliary verb is used with movement verbs in the perfect tense?',
            options: ['haben', 'sein', 'werden', 'können'],
            correctAnswer: 'sein',
            hint: 'Think about verbs that indicate a change of location or state.',
            explanation: 'Movement verbs like "gehen" (to go), "fahren" (to drive), and "fliegen" (to fly) use "sein" as their auxiliary verb in the perfect tense.',
          },
          {
            type: 'explanation',
            title: 'Past Participles',
            content: 'Regular verbs form the past participle by adding ge- at the beginning and -t at the end of the stem:',
            examples: [
              { german: 'spielen → gespielt', english: 'to play → played' },
              { german: 'machen → gemacht', english: 'to do/make → done/made' },
              { german: 'kaufen → gekauft', english: 'to buy → bought' },
            ],
          },
          {
            type: 'practice',
            question: 'What is the past participle of "arbeiten" (to work)?',
            options: ['gearbeitet', 'arbeitet', 'gearbeit', 'arbeitete'],
            correctAnswer: 'gearbeitet',
            hint: 'Regular verbs add ge- at the beginning and -t at the end of the stem.',
            explanation: 'The past participle of "arbeiten" is "gearbeitet." It follows the regular pattern of adding ge- at the beginning and -t at the end of the stem.',
          },
          {
            type: 'explanation',
            title: 'Simple Past (Präteritum)',
            content: 'The simple past is mainly used in written German and for certain common verbs in spoken German:',
            examples: [
              { german: 'Ich war in Berlin.', english: 'I was in Berlin.' },
              { german: 'Er hatte ein Auto.', english: 'He had a car.' },
              { german: 'Wir gingen ins Kino.', english: 'We went to the cinema.' },
            ],
          },
          {
            type: 'practice',
            question: 'Complete the sentence in the simple past: "Ich _____ müde." (to be)',
            options: ['bin', 'war', 'habe', 'hatte'],
            correctAnswer: 'war',
            hint: 'This is the simple past form of "sein" (to be) in the first person singular.',
            explanation: '"Ich war müde" means "I was tired." "War" is the simple past form of "sein" (to be) for the first person singular.',
          },
          {
            type: 'practice',
            question: 'Which sentence is in the perfect tense?',
            options: ['Ich ging nach Hause.', 'Ich gehe nach Hause.', 'Ich bin nach Hause gegangen.', 'Ich werde nach Hause gehen.'],
            correctAnswer: 'Ich bin nach Hause gegangen.',
            hint: 'Look for the auxiliary verb (haben/sein) + past participle structure.',
            explanation: '"Ich bin nach Hause gegangen" (I have gone home/I went home) is in the perfect tense. It uses the auxiliary verb "bin" (from sein) and the past participle "gegangen."',
          },
          {
            type: 'completion',
            title: 'Well Done!',
            content: 'You\'ve completed the Past Tense lesson. You now understand how to form and use the past tenses in German!',
            summary: [
              'Perfect tense formation with haben and sein',
              'Regular past participle formation',
              'Simple past (Präteritum) usage',
              'Differences between the two past tenses'
            ]
          },
        ],
      };
    }
    // Lesson 11: Accusative Case (Intermediate)
    else if (id === 11) {
      return {
        title: lessonInfo?.title || 'Accusative Case',
        category: lessonInfo?.category || 'grammar',
        steps: [
          {
            type: 'intro',
            title: 'The Accusative Case in German',
            content: 'In this lesson, you will learn about the accusative case in German, which is used for direct objects and after certain prepositions.'
          },
          {
            type: 'explanation',
            title: 'Accusative Articles',
            content: 'Here are the definite and indefinite articles in the accusative case:',
            examples: [
              { german: 'der → den (masculine)', english: 'the → the' },
              { german: 'die → die (feminine)', english: 'the → the' },
              { german: 'das → das (neuter)', english: 'the → the' },
              { german: 'die → die (plural)', english: 'the → the' },
              { german: 'ein → einen (masculine)', english: 'a → a' },
              { german: 'eine → eine (feminine)', english: 'a → a' },
              { german: 'ein → ein (neuter)', english: 'a → a' },
            ],
          },
          {
            type: 'practice',
            question: 'What is the accusative form of the definite article "der" (masculine)?',
            options: ['dem', 'den', 'der', 'das'],
            correctAnswer: 'den',
            hint: 'The masculine definite article changes in the accusative case.',
            explanation: 'The definite article "der" (masculine) changes to "den" in the accusative case. For example: "Ich sehe den Mann" (I see the man).',
          },
          {
            type: 'explanation',
            title: 'Accusative Prepositions',
            content: 'These prepositions always take the accusative case:',
            examples: [
              { german: 'durch', english: 'through' },
              { german: 'für', english: 'for' },
              { german: 'gegen', english: 'against' },
              { german: 'ohne', english: 'without' },
              { german: 'um', english: 'around, at (time)' },
            ],
          },
          {
            type: 'practice',
            question: 'Complete the sentence with the correct accusative form: "Ich kaufe _____ Apfel." (the)',
            options: ['der', 'den', 'dem', 'das'],
            correctAnswer: 'den',
            hint: '"Apfel" is masculine, and direct objects take the accusative case.',
            explanation: '"Ich kaufe den Apfel" means "I buy the apple." "Der Apfel" (masculine) becomes "den Apfel" in the accusative case when it functions as the direct object.',
          },
          {
            type: 'explanation',
            title: 'Direct Objects',
            content: 'The accusative case is used for direct objects (the recipient of the action of the verb):',
            examples: [
              { german: 'Ich sehe den Film.', english: 'I see the film.' },
              { german: 'Sie liest ein Buch.', english: 'She reads a book.' },
              { german: 'Er trinkt das Wasser.', english: 'He drinks the water.' },
            ],
          },
          {
            type: 'practice',
            question: 'Which sentence has the correct accusative form?',
            options: ['Ich habe der Schlüssel.', 'Ich habe den Schlüssel.', 'Ich habe dem Schlüssel.', 'Ich habe das Schlüssel.'],
            correctAnswer: 'Ich habe den Schlüssel.',
            hint: '"Schlüssel" (key) is masculine, and direct objects take the accusative case.',
            explanation: '"Ich habe den Schlüssel" (I have the key) is correct. "Der Schlüssel" (masculine) becomes "den Schlüssel" in the accusative case when it functions as the direct object.',
          },
          {
            type: 'completion',
            title: 'Well Done!',
            content: 'You\'ve completed the Accusative Case lesson. You now understand how to use the accusative case in German!',
            summary: [
              'Accusative case articles and their forms',
              'Prepositions that always take the accusative case',
              'Using the accusative case for direct objects',
              'Forming accusative constructions in sentences'
            ]
          },
        ],
      };
    }
    // Lesson 12: Weather & Seasons (Intermediate)
    else if (id === 12) {
      return {
        title: lessonInfo?.title || 'Weather & Seasons',
        category: lessonInfo?.category || 'vocabulary',
        steps: [
          {
            type: 'intro',
            title: 'Weather and Seasons in German',
            content: 'In this lesson, you will learn vocabulary and phrases related to weather and seasons in German.'
          },
          {
            type: 'explanation',
            title: 'The Four Seasons',
            content: 'Here are the four seasons in German:',
            examples: [
              { german: 'der Frühling', english: 'spring' },
              { german: 'der Sommer', english: 'summer' },
              { german: 'der Herbst', english: 'autumn/fall' },
              { german: 'der Winter', english: 'winter' },
            ],
          },
          {
            type: 'practice',
            question: 'What is the German word for "autumn"?',
            options: ['der Frühling', 'der Sommer', 'der Herbst', 'der Winter'],
            correctAnswer: 'der Herbst',
            hint: 'This season comes after summer and before winter.',
            explanation: '"Der Herbst" is the German word for "autumn" or "fall." It\'s the season when leaves change color and fall from trees.',
          },
          {
            type: 'explanation',
            title: 'Weather Conditions',
            content: 'Common weather conditions in German:',
            examples: [
              { german: 'sonnig', english: 'sunny' },
              { german: 'regnerisch', english: 'rainy' },
              { german: 'bewölkt', english: 'cloudy' },
              { german: 'windig', english: 'windy' },
              { german: 'neblig', english: 'foggy' },
              { german: 'schneebedeckt', english: 'snowy' },
            ],
          },
          {
            type: 'practice',
            question: 'Match the German word "bewölkt" with its English meaning:',
            options: ['sunny', 'rainy', 'cloudy', 'windy'],
            correctAnswer: 'cloudy',
            hint: 'Think about a sky covered with clouds.',
            explanation: '"Bewölkt" means "cloudy" in English. It describes weather when the sky is covered with clouds.',
          },
          {
            type: 'explanation',
            title: 'Weather Phrases',
            content: 'Useful phrases to talk about the weather:',
            examples: [
              { german: 'Wie ist das Wetter heute?', english: 'How is the weather today?' },
              { german: 'Es regnet.', english: 'It\'s raining.' },
              { german: 'Es schneit.', english: 'It\'s snowing.' },
              { german: 'Die Sonne scheint.', english: 'The sun is shining.' },
              { german: 'Es ist kalt/warm.', english: 'It\'s cold/warm.' },
            ],
          },
          {
            type: 'practice',
            question: 'How would you say "It\'s snowing" in German?',
            options: ['Es regnet.', 'Es schneit.', 'Es ist kalt.', 'Die Sonne scheint.'],
            correctAnswer: 'Es schneit.',
            hint: 'Think about the verb related to snow (Schnee).',
            explanation: '"Es schneit" means "It\'s snowing" in German. The verb "schneien" means "to snow."',
          },
          {
            type: 'practice',
            question: 'Complete the sentence: "Im Sommer ist es oft _____."',
            options: ['kalt', 'warm', 'schneebedeckt', 'neblig'],
            correctAnswer: 'warm',
            hint: 'Think about the typical temperature in summer.',
            explanation: '"Im Sommer ist es oft warm" means "In summer it\'s often warm." Summer is typically associated with warm temperatures.',
          },
          {
            type: 'completion',
            title: 'Well Done!',
            content: 'You\'ve completed the Weather & Seasons lesson. You now know how to talk about weather and seasons in German!',
            summary: [
              'The four seasons in German',
              'Common weather conditions',
              'Phrases to describe the weather',
              'Seasonal vocabulary'
            ]
          },
        ],
      };
    }
    // Lesson 13: Conjunctions (Intermediate-Advanced)
    else if (id === 13) {
      return {
        title: lessonInfo?.title || 'Conjunctions',
        category: lessonInfo?.category || 'grammar',
        steps: [
          {
            type: 'intro',
            title: 'Conjunctions in German',
            content: 'In this lesson, you will learn about coordinating and subordinating conjunctions in German and how they affect word order.'
          },
          {
            type: 'explanation',
            title: 'Coordinating Conjunctions',
            content: 'Coordinating conjunctions join elements of equal grammatical rank. They don\'t affect word order:',
            examples: [
              { german: 'und', english: 'and' },
              { german: 'oder', english: 'or' },
              { german: 'aber', english: 'but' },
              { german: 'denn', english: 'because' },
              { german: 'sondern', english: 'but rather (after negation)' },
            ],
          },
          {
            type: 'practice',
            question: 'Which conjunction would you use to express contrast after a negative statement?',
            options: ['und', 'aber', 'sondern', 'oder'],
            correctAnswer: 'sondern',
            hint: 'This conjunction is used to correct a negative statement.',
            explanation: '"Sondern" is used after a negative statement to introduce a correction. For example: "Das ist nicht rot, sondern blau" (That\'s not red, but blue).',
          },
          {
            type: 'explanation',
            title: 'Subordinating Conjunctions',
            content: 'Subordinating conjunctions introduce dependent clauses and send the conjugated verb to the end of the clause:',
            examples: [
              { german: 'weil', english: 'because' },
              { german: 'wenn', english: 'if, when' },
              { german: 'dass', english: 'that' },
              { german: 'obwohl', english: 'although' },
              { german: 'als', english: 'when (past one-time event)' },
            ],
          },
          {
            type: 'practice',
            question: 'What happens to the word order after a subordinating conjunction?',
            options: ['The verb comes second', 'The verb comes first', 'The verb goes to the end', 'The word order doesn\'t change'],
            correctAnswer: 'The verb goes to the end',
            hint: 'Subordinating conjunctions affect the position of the conjugated verb.',
            explanation: 'After a subordinating conjunction, the conjugated verb moves to the end of the clause. For example: "Ich bleibe zu Hause, weil es regnet" (I\'m staying home because it\'s raining).',
          },
          {
            type: 'practice',
            question: 'Which sentence has the correct word order?',
            options: ['Ich komme nicht, weil ich bin krank.', 'Ich komme nicht, weil ich krank bin.', 'Ich komme nicht, weil bin ich krank.', 'Ich komme nicht, bin ich krank weil.'],
            correctAnswer: 'Ich komme nicht, weil ich krank bin.',
            hint: 'Remember the rule for verb position after subordinating conjunctions.',
            explanation: '"Ich komme nicht, weil ich krank bin" (I\'m not coming because I\'m sick) is correct. After the subordinating conjunction "weil," the conjugated verb "bin" moves to the end of the clause.',
          },
          {
            type: 'explanation',
            title: 'Two-Part Conjunctions',
            content: 'Some conjunctions in German come in pairs:',
            examples: [
              { german: 'entweder ... oder', english: 'either ... or' },
              { german: 'sowohl ... als auch', english: 'both ... and' },
              { german: 'weder ... noch', english: 'neither ... nor' },
              { german: 'je ... desto/umso', english: 'the ... the' },
            ],
          },
          {
            type: 'practice',
            question: 'Complete the sentence: "_____ er Deutsch _____ Englisch." (He speaks neither German nor English)',
            options: ['Entweder ... oder', 'Sowohl ... als auch', 'Weder ... noch', 'Je ... desto'],
            correctAnswer: 'Weder ... noch',
            hint: 'This conjunction pair is used for double negation.',
            explanation: '"Weder ... noch" means "neither ... nor" and is used for double negation. The complete sentence would be "Er spricht weder Deutsch noch Englisch" (He speaks neither German nor English).',
          },
          {
            type: 'completion',
            title: 'Well Done!',
            content: 'You\'ve completed the Conjunctions lesson. You now understand how to use different types of conjunctions in German!',
            summary: [
              'Coordinating conjunctions and their usage',
              'Subordinating conjunctions and their effect on word order',
              'Two-part conjunctions',
              'Constructing complex sentences with conjunctions'
            ]
          },
        ],
      };
    }
    // Lesson 14: Comparative and Superlative (Intermediate)
    else if (id === 14) {
      return {
        title: lessonInfo?.title || 'Comparative and Superlative',
        category: lessonInfo?.category || 'grammar',
        steps: [
          {
            type: 'intro',
            title: 'Comparative and Superlative in German',
            content: 'In this lesson, you will learn how to form and use comparative and superlative forms of adjectives and adverbs in German.'
          },
          {
            type: 'explanation',
            title: 'Comparative Forms',
            content: 'To form the comparative in German, add -er to the adjective:',
            examples: [
              { german: 'klein → kleiner', english: 'small → smaller' },
              { german: 'groß → größer', english: 'big → bigger' },
              { german: 'alt → älter', english: 'old → older' },
              { german: 'schnell → schneller', english: 'fast → faster' },
            ],
          },
          {
            type: 'practice',
            question: 'What is the comparative form of "schön" (beautiful)?',
            options: ['schöner', 'schönst', 'schönen', 'schöne'],
            correctAnswer: 'schöner',
          },
          {
            type: 'completion',
            title: 'Well Done!',
            content: 'You\'ve completed the Comparative and Superlative lesson. You now understand how to form and use comparative and superlative forms in German!',
            summary: [
              'Adding -er to form the comparative',
              'Special cases with umlaut changes',
              'Forming the superlative with -ste',
              'Using comparative and superlative in sentences'
            ]
          },
        ],
      };
    }
    
    // Lesson 15: Future Tense (Intermediate-Advanced)
    else if (id === 15) {
      return {
        title: lessonInfo?.title || 'Future Tense',
        category: lessonInfo?.category || 'grammar',
        steps: [
          {
            type: 'intro',
            title: 'Future Tense in German',
            content: 'In this lesson, you will learn how to form and use the future tense in German to talk about upcoming events and plans.'
          },
          {
            type: 'explanation',
            title: 'Forming the Future Tense',
            content: 'The future tense in German is formed with the auxiliary verb "werden" + infinitive:',
            examples: [
              { german: 'Ich werde spielen', english: 'I will play' },
              { german: 'Du wirst lernen', english: 'You will learn' },
              { german: 'Er/Sie/Es wird kommen', english: 'He/She/It will come' },
              { german: 'Wir werden gehen', english: 'We will go' },
              { german: 'Ihr werdet sehen', english: 'You (plural) will see' },
              { german: 'Sie werden bleiben', english: 'They will stay' },
            ],
          },
          {
            type: 'practice',
            question: 'What is the correct future tense form of "Ich lese ein Buch"?',
            options: ['Ich werde ein Buch lesen', 'Ich wurde ein Buch lesen', 'Ich bin ein Buch lesen', 'Ich habe ein Buch lesen'],
            correctAnswer: 'Ich werde ein Buch lesen',
            hint: 'Use the present tense of "werden" + infinitive.',
            explanation: 'The future tense is formed with the conjugated form of "werden" (werde, wirst, wird, etc.) + the infinitive form of the main verb at the end of the clause.',
          },
          {
            type: 'explanation',
            title: 'Word Order in Future Tense',
            content: 'In the future tense, the infinitive verb goes to the end of the clause:',
            examples: [
              { german: 'Morgen werde ich nach Berlin fahren.', english: 'Tomorrow I will travel to Berlin.' },
              { german: 'Nächstes Jahr werden wir ein neues Haus kaufen.', english: 'Next year we will buy a new house.' },
            ],
          },
          {
            type: 'practice',
            question: 'Which sentence has the correct word order?',
            options: ['Ich werde gehen morgen ins Kino.', 'Ich werde morgen ins Kino gehen.', 'Ich morgen werde ins Kino gehen.', 'Ich werde ins Kino morgen gehen.'],
            correctAnswer: 'Ich werde morgen ins Kino gehen.',
            hint: 'The infinitive verb should be at the end of the clause.',
            explanation: '"Ich werde morgen ins Kino gehen" has the correct word order. The conjugated form of "werden" (werde) is in the second position, and the infinitive (gehen) is at the end of the clause.',
          },
          {
            type: 'explanation',
            title: 'Using Present Tense for Future Events',
            content: 'In German, the present tense is often used to express future actions, especially with a time marker:',
            examples: [
              { german: 'Morgen gehe ich ins Kino.', english: 'Tomorrow I\'m going to the cinema.' },
              { german: 'Nächste Woche fliege ich nach Deutschland.', english: 'Next week I\'m flying to Germany.' },
            ],
          },
          {
            type: 'practice',
            question: 'Which sentence uses the present tense to express a future action?',
            options: ['Ich bin gestern ins Kino gegangen.', 'Ich gehe jetzt ins Kino.', 'Ich werde morgen ins Kino gehen.', 'Ich gehe nächsten Samstag ins Kino.'],
            correctAnswer: 'Ich gehe nächsten Samstag ins Kino.',
            hint: 'Look for a present tense verb with a future time marker.',
            explanation: '"Ich gehe nächsten Samstag ins Kino" uses the present tense verb "gehe" with the future time marker "nächsten Samstag" to express a future action.',
          },
          {
            type: 'practice',
            question: 'Complete the sentence: "Wir _____ nächstes Jahr nach Deutschland reisen."',
            options: ['werden', 'wurden', 'sind', 'haben'],
            correctAnswer: 'werden',
            hint: 'You need the plural form of "werden" in the present tense.',
            explanation: '"Wir werden nächstes Jahr nach Deutschland reisen" is correct. "Werden" is conjugated to "werden" for the subject "wir" (we) in the present tense to form the future tense.',
          },
          {
            type: 'practice',
            question: 'Translate: "She will call you tomorrow."',
            options: ['Sie hat dich morgen angerufen.', 'Sie wird dich morgen anrufen.', 'Sie ruft dich morgen an.', 'Sie würde dich morgen anrufen.'],
            correctAnswer: 'Sie wird dich morgen anrufen.',
            hint: 'Use the future tense with "werden" + infinitive.',
            explanation: '"Sie wird dich morgen anrufen" correctly uses the future tense. "Wird" is the conjugated form of "werden" for the third person singular (sie), and "anrufen" is the infinitive placed at the end.',
          },
          {
            type: 'completion',
            title: 'Well Done!',
            content: 'You\'ve completed the Future Tense lesson. You now understand how to form and use the future tense in German!',
            summary: [
              'Forming the future tense with werden + infinitive',
              'Word order in future tense sentences',
              'Using present tense with time markers to express future actions',
              'Conjugating werden correctly for different subjects'
            ]
          },
        ],
      };
    }
    
    // Lesson 16: Prepositions with Two Cases (Advanced)
    else if (id === 16) {
      return {
        title: lessonInfo?.title || 'Prepositions with Two Cases',
        category: lessonInfo?.category || 'grammar',
        steps: [
          {
            type: 'intro',
            title: 'Two-Way Prepositions in German',
            content: 'In this lesson, you will learn about prepositions that can take either the accusative or dative case depending on the context.'
          },
          {
            type: 'explanation',
            title: 'Two-Way Prepositions',
            content: 'These prepositions can take either the accusative or dative case:',
            examples: [
              { german: 'an (at, on)', english: 'an dem/an den' },
              { german: 'auf (on, upon)', english: 'auf dem/auf den' },
              { german: 'hinter (behind)', english: 'hinter dem/hinter den' },
              { german: 'in (in, into)', english: 'in dem/in den' },
              { german: 'neben (next to)', english: 'neben dem/neben den' },
              { german: 'über (over, above)', english: 'über dem/über den' },
              { german: 'unter (under)', english: 'unter dem/unter den' },
              { german: 'vor (in front of)', english: 'vor dem/vor den' },
              { german: 'zwischen (between)', english: 'zwischen dem/zwischen den' },
            ],
          },
          {
            type: 'explanation',
            title: 'Accusative vs. Dative',
            content: 'The case depends on the motion or location: Accusative for motion/direction (wohin? - where to?), Dative for location/position (wo? - where?):',
            examples: [
              { german: 'Ich gehe in den Park. (accusative - motion)', english: 'I am going into the park.' },
              { german: 'Ich bin in dem Park. (dative - location)', english: 'I am in the park.' },
            ],
          },
          {
            type: 'practice',
            question: 'Which case should be used in this sentence? "Die Katze springt _____ den Tisch." (onto)',
            options: ['accusative', 'dative', 'nominative', 'genitive'],
            correctAnswer: 'accusative',
            hint: 'Is the cat moving to a new position or already in a position?',
            explanation: 'Accusative case should be used because the sentence describes motion (the cat jumping onto the table). The preposition "auf" takes the accusative case when indicating direction or movement.',
          },
          {
            type: 'practice',
            question: 'Complete the sentence with the correct form: "Das Buch liegt _____ Tisch." (on the)',
            options: ['auf dem', 'auf den', 'auf der', 'auf das'],
            correctAnswer: 'auf dem',
            hint: 'This describes the location of the book, not movement.',
            explanation: '"Das Buch liegt auf dem Tisch" (The book is lying on the table) describes a static location, so the preposition "auf" takes the dative case. "Tisch" is masculine, so "dem" is the correct dative article.',
          },
          {
            type: 'practice',
            question: 'Which sentence correctly uses a two-way preposition?',
            options: ['Ich gehe zu dem Supermarkt.', 'Er stellt die Lampe auf den Tisch.', 'Sie kommt aus der Schule.', 'Wir fahren nach Berlin.'],
            correctAnswer: 'Er stellt die Lampe auf den Tisch.',
            hint: 'Look for a sentence with one of the two-way prepositions and the correct case based on motion or location.',
            explanation: '"Er stellt die Lampe auf den Tisch" (He puts the lamp on the table) correctly uses the two-way preposition "auf" with the accusative case because it indicates motion/direction (putting something onto something else).',
          },
          {
            type: 'practice',
            question: 'Complete the sentence: "Die Kinder spielen _____ Garten." (in the)',
            options: ['in dem', 'in den', 'in der', 'in das'],
            correctAnswer: 'in dem',
            hint: 'Are the children moving into the garden or already playing there?',
            explanation: '"Die Kinder spielen in dem Garten" (The children are playing in the garden) describes a location where the action is taking place, not movement, so the preposition "in" takes the dative case. "Garten" is masculine, so "dem" is the correct dative article.',
          },
          {
            type: 'completion',
            title: 'Well Done!',
            content: 'You\'ve completed the Prepositions with Two Cases lesson. You now understand how to use two-way prepositions in German!',
            summary: [
              'Identifying two-way prepositions',
              'Using accusative case for motion/direction (wohin?)',
              'Using dative case for location/position (wo?)',
              'Applying the correct case in context'
            ]
          },
        ],
      };
    }
    // Lesson 17: Passive Voice (Advanced)
    else if (id === 17) {
      return {
        title: lessonInfo?.title || 'Passive Voice',
        category: lessonInfo?.category || 'grammar',
        steps: [
          {
            type: 'intro',
            title: 'Passive Voice in German',
            content: 'In this lesson, you will learn how to form and use the passive voice in German.'
          },
          {
            type: 'explanation',
            title: 'Active vs. Passive Voice',
            content: 'In the active voice, the subject performs the action. In the passive voice, the subject receives the action:',
            examples: [
              { german: 'Active: Der Lehrer korrigiert die Hausaufgaben.', english: 'The teacher corrects the homework.' },
              { german: 'Passive: Die Hausaufgaben werden vom Lehrer korrigiert.', english: 'The homework is corrected by the teacher.' },
            ],
          },
          {
            type: 'explanation',
            title: 'Forming the Passive Voice',
            content: 'The passive voice is formed with the auxiliary verb "werden" + past participle:',
            examples: [
              { german: 'Present: Das Haus wird gebaut.', english: 'The house is being built.' },
              { german: 'Past: Das Haus wurde gebaut.', english: 'The house was built.' },
              { german: 'Future: Das Haus wird gebaut werden.', english: 'The house will be built.' },
              { german: 'Perfect: Das Haus ist gebaut worden.', english: 'The house has been built.' },
            ],
          },
          {
            type: 'practice',
            question: 'Transform this active sentence to passive: "Man spricht Deutsch in Österreich."',
            options: ['Deutsch wird in Österreich gesprochen.', 'Deutsch ist in Österreich gesprochen.', 'Deutsch spricht man in Österreich.', 'In Österreich wird Deutsch sprechen.'],
            correctAnswer: 'Deutsch wird in Österreich gesprochen.',
            hint: 'Use "werden" in the present tense + past participle of "sprechen."',
            explanation: '"Deutsch wird in Österreich gesprochen" (German is spoken in Austria) is the correct passive form. The direct object in the active sentence ("Deutsch") becomes the subject in the passive sentence.',
          },
          {
            type: 'explanation',
            title: 'Expressing the Agent',
            content: 'To mention who performs the action in the passive voice, use "von" (by) or "durch" (through):',
            examples: [
              { german: 'Der Brief wird von meiner Mutter geschrieben.', english: 'The letter is written by my mother.' },
              { german: 'Die Stadt wurde durch ein Erdbeben zerstört.', english: 'The city was destroyed by an earthquake.' },
            ],
          },
          {
            type: 'practice',
            question: 'Complete the passive sentence: "Das Auto _____ von meinem Vater repariert." (is)',
            options: ['wird', 'ist', 'wurde', 'hat'],
            correctAnswer: 'wird',
            hint: 'You need the present tense form of "werden" for the present passive.',
            explanation: '"Das Auto wird von meinem Vater repariert" (The car is being repaired by my father) uses the present tense of "werden" (wird) to form the present passive.',
          },
          {
            type: 'practice',
            question: 'Which sentence is in the passive voice?',
            options: ['Er hat das Buch gelesen.', 'Das Buch wird gelesen.', 'Er liest das Buch.', 'Das Buch ist interessant.'],
            correctAnswer: 'Das Buch wird gelesen.',
            hint: 'Look for the structure: werden + past participle.',
            explanation: '"Das Buch wird gelesen" (The book is being read) is in the passive voice. It uses the auxiliary verb "werden" (wird) + the past participle "gelesen."',
          },
          {
            type: 'practice',
            question: 'Transform to passive: "Die Polizei hat den Dieb gefangen."',
            options: ['Der Dieb hat die Polizei gefangen.', 'Der Dieb wird von der Polizei gefangen.', 'Der Dieb wurde von der Polizei gefangen.', 'Der Dieb ist von der Polizei gefangen worden.'],
            correctAnswer: 'Der Dieb ist von der Polizei gefangen worden.',
            hint: 'The active sentence is in the perfect tense, so you need the perfect passive.',
            explanation: '"Der Dieb ist von der Polizei gefangen worden" (The thief has been caught by the police) is the correct perfect passive form. The perfect passive uses "sein" + past participle + "worden."',
          },
          {
            type: 'completion',
            title: 'Well Done!',
            content: 'You\'ve completed the Passive Voice lesson. You now know how to form and use the passive voice in German!',
            summary: [
              'Forming the passive voice with werden + past participle',
              'Passive voice in different tenses',
              'Expressing the agent with von or durch',
              'Transforming active sentences to passive'
            ]
          },
        ],
      };
    }
    // Lesson 18: Subjunctive Mood (Advanced)
    else if (id === 18) {
      return {
        title: lessonInfo?.title || 'Subjunctive Mood',
        category: lessonInfo?.category || 'grammar',
        steps: [
          {
            type: 'intro',
            title: 'Subjunctive Mood in German',
            content: 'In this lesson, you will learn about the subjunctive mood (Konjunktiv) in German, which is used to express wishes, hypothetical situations, and reported speech.'
          },
          {
            type: 'explanation',
            title: 'Subjunctive II (Konjunktiv II)',
            content: 'Konjunktiv II is used for hypothetical situations, wishes, and polite requests:',
            examples: [
              { german: 'Ich wäre gern Arzt.', english: 'I would like to be a doctor.' },
              { german: 'Wenn ich Zeit hätte, würde ich dich besuchen.', english: 'If I had time, I would visit you.' },
              { german: 'Könnten Sie mir helfen?', english: 'Could you help me?' },
            ],
          },
          {
            type: 'practice',
            question: 'What is the Konjunktiv II form of "haben" in the first person singular?',
            options: ['habe', 'hätte', 'hatte', 'haben'],
            correctAnswer: 'hätte',
            hint: 'The Konjunktiv II forms often have umlauts.',
            explanation: '"Hätte" is the Konjunktiv II form of "haben" in the first person singular. It\'s used in hypothetical situations like "Wenn ich Zeit hätte" (If I had time).',
          },
          {
            type: 'explanation',
            title: 'Forming Konjunktiv II',
            content: 'For most verbs, Konjunktiv II can be formed with "würde" + infinitive:',
            examples: [
              { german: 'Ich würde gehen.', english: 'I would go.' },
              { german: 'Du würdest spielen.', english: 'You would play.' },
              { german: 'Er/Sie/Es würde lesen.', english: 'He/She/It would read.' },
            ],
          },
          {
            type: 'practice',
            question: 'Complete the sentence: "Wenn ich reich wäre, _____ ich ein großes Haus kaufen." (would)',
            options: ['würde', 'werde', 'wurde', 'werden'],
            correctAnswer: 'würde',
            hint: 'You need the first person singular form of "würde" + infinitive.',
            explanation: '"Wenn ich reich wäre, würde ich ein großes Haus kaufen" (If I were rich, I would buy a big house) uses "würde" + infinitive to form the Konjunktiv II.',
          },
          {
            type: 'explanation',
            title: 'Modal Verbs in Konjunktiv II',
            content: 'Modal verbs have special Konjunktiv II forms:',
            examples: [
              { german: 'können → könnte', english: 'can → could' },
              { german: 'müssen → müsste', english: 'must → would have to' },
              { german: 'dürfen → dürfte', english: 'may → might' },
              { german: 'wollen → wollte', english: 'want → would want' },
            ],
          },
          {
            type: 'practice',
            question: 'Which is the correct Konjunktiv II form of "können"?',
            options: ['kann', 'könnte', 'konnte', 'können'],
            correctAnswer: 'könnte',
            hint: 'The Konjunktiv II form of modal verbs often adds an umlaut to the past tense form.',
            explanation: '"Könnte" is the Konjunktiv II form of "können." It\'s used in sentences like "Ich könnte dir helfen" (I could help you).',
          },
          {
            type: 'practice',
            question: 'Complete the sentence: "Ich _____ gern mehr Zeit haben." (would like to)',
            options: ['würde', 'wollte', 'möchte', 'hätte'],
            correctAnswer: 'würde',
            hint: 'You need the "würde" form to express "would like to" with a regular verb.',
            explanation: '"Ich würde gern mehr Zeit haben" (I would like to have more time) uses "würde" + "gern" to express a wish or desire.',
          },
          {
            type: 'completion',
            title: 'Well Done!',
            content: 'You\'ve completed the Subjunctive Mood lesson. You now understand how to express hypothetical situations and wishes in German!',
            summary: [
              'Using Konjunktiv II for hypothetical situations and wishes',
              'Forming Konjunktiv II with würde + infinitive',
              'Special Konjunktiv II forms for common verbs',
              'Modal verbs in the subjunctive mood'
            ]
          },
        ],
      };
    }
    // Lesson 19: Relative Clauses (Advanced)
    else if (id === 19) {
      return {
        title: lessonInfo?.title || 'Relative Clauses',
        category: lessonInfo?.category || 'grammar',
        steps: [
          {
            type: 'intro',
            title: 'Relative Clauses in German',
            content: 'In this lesson, you will learn how to form and use relative clauses in German to provide additional information about a noun.'
          },
          {
            type: 'explanation',
            title: 'Relative Pronouns',
            content: 'German relative pronouns are similar to the definite articles but have different forms in some cases:',
            examples: [
              { german: 'Nominative: der, die, das, die (plural)', english: 'who, which, that' },
              { german: 'Accusative: den, die, das, die (plural)', english: 'whom, which, that' },
              { german: 'Dative: dem, der, dem, denen (plural)', english: 'to/for whom, to/for which' },
              { german: 'Genitive: dessen, deren, dessen, deren (plural)', english: 'whose, of which' },
            ],
          },
          {
            type: 'practice',
            question: 'Which relative pronoun would you use for a masculine noun in the accusative case?',
            options: ['der', 'den', 'dem', 'dessen'],
            correctAnswer: 'den',
            hint: 'Think about the accusative form of the definite article for masculine nouns.',
          },
        ],
      };
    }
    
    return {
      title: 'Lesson Not Found',
      category: 'unknown',
      steps: [
        {
          type: 'intro',
          title: 'Oops!',
          content: 'This lesson content is not available. Please try another lesson.',
        },
      ],
    };
  };
  
  const lesson = getLessonData();
  const currentStepData = lesson.steps[currentStep];
  const totalSteps = lesson.steps.length;
  
  // Count total practice questions when lesson data loads
  useEffect(() => {
    if (lesson && lesson.steps) {
      const practiceCount = lesson.steps.filter(step => step.type === 'practice').length;
      setTotalQuestions(practiceCount);
    }
  }, [lesson]);
  
  // Handle navigation between steps
  const goToNextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
      setSelectedAnswer(null);
      setIsCorrect(null);
      setShowHint(false);
    } else if (currentStep === totalSteps - 1 && lessonInfo) {
      // Calculate time spent in minutes
      const timeSpent = Math.round((Date.now() - startTime) / 60000);
      
      // Calculate accuracy
      const accuracy = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;
      
      // Count words learned (estimate based on lesson type)
      const wordsLearned = lesson.category === 'vocabulary' ? 10 : 5;
      
      // Update stats
      updateStats({
        wordsLearned: userData.stats.wordsLearned + wordsLearned
      });
      
      // Update accuracy separately using weighted average
      updateAccuracy(accuracy);
      
      // Update time distribution separately (also updates totalTime)
      updateTimeDistribution(lesson.category, timeSpent);
      
      // Mark lesson as complete with 100% progress
      updateProgress(lessonInfo.courseType, id, 100);
      
      // Navigate back to courses
      navigate('/courses');
    }
  };
  
  const goToPreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setSelectedAnswer(null);
      setIsCorrect(null);
      setShowHint(false);
    }
  };
  
  // Handle checking answer
  const checkAnswer = () => {
    if (selectedAnswer === currentStepData.correctAnswer) {
      setIsCorrect(true);
      setCorrectAnswers(prevCorrect => prevCorrect + 1);
      
      // Increment progress 
      if (lessonInfo && lessonInfo.progress < 100) {
        // Calculate progress increment based on total practice steps
        const practiceSteps = lesson.steps.filter(step => step.type === 'practice').length;
        const progressIncrement = practiceSteps > 0 ? (100 / practiceSteps) : 0;
        
        // Calculate new progress
        const newProgress = Math.min(
          Math.round(lessonInfo.progress + progressIncrement), 
          100
        );
        
        // Update progress if it's higher than current
        if (newProgress > lessonInfo.progress) {
          updateProgress(lessonInfo.courseType, id, newProgress);
        }
      }
    } else {
      setIsCorrect(false);
    }
  };
  
  // Toggle hint visibility
  const toggleHint = () => {
    setShowHint(!showHint);
  };
  
  // Simulated function to play pronunciation
  const playPronunciation = (text) => {
    alert(`Playing pronunciation for: ${text}`);
    // In a real app, this would trigger audio playback
  };
  
  // Get category-specific colors and gradients
  const getCategoryColors = () => {
    switch(lesson.category) {
      case 'phrases':
        return {
          color: 'purple',
          widgetVariant: 'widgetPurple',
          gradient: 'bg-gradient-to-br from-[#E7D6FF] to-[#F4EAFF] dark:from-[#7C3AED]/90 dark:to-[#6D32D1]/90',
          accent: 'bg-[#7C3AED] dark:bg-[#AF52DE]'
        };
      case 'grammar':
        return {
          color: 'blue',
          widgetVariant: 'widgetBlue',
          gradient: 'bg-gradient-to-br from-[#D1E5FF] to-[#E8F4FF] dark:from-[#0A58CA]/90 dark:to-[#094CB2]/90',
          accent: 'bg-[#0A58CA] dark:bg-[#0A84FF]'
        };
      case 'vocabulary':
        return {
          color: 'green',
          widgetVariant: 'widgetGreen',
          gradient: 'bg-gradient-to-br from-[#D4F7DF] to-[#E8FFF0] dark:from-[#148F47]/90 dark:to-[#107A3C]/90',
          accent: 'bg-[#148F47] dark:bg-[#34C759]'
        };
      case 'culture':
        return {
          color: 'pink',
          widgetVariant: 'widgetPink',
          gradient: 'bg-gradient-to-br from-[#FFCFE3] to-[#FFE8F0] dark:from-[#E0115F]/90 dark:to-[#C00F51]/90',
          accent: 'bg-[#E0115F] dark:bg-[#FF2D55]'
        };
      default:
        return {
          color: 'default',
          widgetVariant: 'widgetNeutral',
          gradient: 'bg-white dark:bg-dark-200',
          accent: 'bg-ios-gray-500 dark:bg-ios-gray-400'
        };
    }
  };
  
  const categoryStyles = getCategoryColors();
  
  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, type: 'spring', stiffness: 260, damping: 20 } }
  };

  // If lesson not found, show a message
  if (!lessonInfo && id) {
    return (
      <div className="py-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            <Link to="/courses" className="mr-4">
              <Button variant="icon" className="bg-white/80 dark:bg-dark-200/80 shadow-sm backdrop-blur-sm">
                <ArrowLeftIcon className="h-6 w-6 text-ios-gray-900 dark:text-white" />
              </Button>
            </Link>
            <h1 className="text-3xl font-bold text-ios-gray-900 dark:text-white">Lesson Not Found</h1>
          </div>
        </div>
        
        <Card variant="widgetNeutral" className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4">Oops!</h2>
          <p className="text-ios-gray-700 dark:text-white/80 mb-6">
            This lesson content is not available. Please try another lesson.
          </p>
          <Link to="/courses">
            <Button variant="primary">Return to Courses</Button>
          </Link>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="py-8">
      {/* Header with Back button */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center">
          <Link to="/courses" className="mr-4">
            <Button variant="icon" className="bg-white/80 dark:bg-dark-200/80 shadow-sm backdrop-blur-sm">
              <ArrowLeftIcon className="h-6 w-6 text-ios-gray-900 dark:text-white" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-ios-gray-900 dark:text-white">{lesson.title}</h1>
            <Badge variant={`filled-${categoryStyles.color}`} className="mt-2">
              {lesson.category.charAt(0).toUpperCase() + lesson.category.slice(1)}
            </Badge>
          </div>
        </div>
      </div>
      
      {/* Progress Section */}
      <motion.section 
        className="mb-6"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold text-[#1A1A1A] dark:text-white mb-2">Your Progress</h3>
          <span className="text-ios-gray-600 dark:text-white/70 text-sm">
            Step {currentStep + 1} of {totalSteps}
          </span>
        </div>
        <Progress 
          value={currentStep + 1} 
          total={totalSteps} 
          color={categoryStyles.color} 
          height="large" 
        />
      </motion.section>
      
      {/* Main Content */}
      <motion.section 
        className="mb-8"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="mb-6"
          variants={item}
        >
          <Card variant={categoryStyles.widgetVariant} className={`${currentStepData.type !== 'practice' ? categoryStyles.gradient : ''} overflow-hidden`}>
            {/* Intro Step */}
            {currentStepData.type === 'intro' && (
              <div className="text-center py-8">
                <h2 className="text-2xl font-bold text-ios-gray-900 dark:text-white mb-4">{currentStepData.title}</h2>
                <p className="text-ios-gray-700 dark:text-white/80 mb-8 max-w-2xl mx-auto">{currentStepData.content}</p>
                <div className="flex justify-center">
                  <Button 
                    onClick={goToNextStep}
                    className={categoryStyles.accent}
                  >
                    Start Learning
                  </Button>
                </div>
              </div>
            )}
            
            {/* Explanation Step */}
            {currentStepData.type === 'explanation' && (
              <div>
                <h2 className="text-xl font-bold text-ios-gray-900 dark:text-white mb-4">{currentStepData.title}</h2>
                <p className="text-ios-gray-700 dark:text-white/80 mb-6">{currentStepData.content}</p>
                
                {currentStepData.examples && (
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-ios-gray-800 dark:text-white mb-3">Examples:</h3>
                    <div className="space-y-3">
                      {currentStepData.examples.map((example, index) => (
                        <div 
                          key={index}
                          className="flex items-center justify-between p-3 bg-white/50 dark:bg-dark-200/50 backdrop-blur-sm rounded-lg"
                        >
                          <div>
                            <p className="font-medium text-ios-gray-900 dark:text-white">{example.german}</p>
                            <p className="text-sm text-ios-gray-700 dark:text-white/80">{example.english}</p>
                          </div>
                          <button 
                            onClick={() => playPronunciation(example.german)}
                            className={`p-2 text-white rounded-full transition-colors ${categoryStyles.accent}`}
                          >
                            <SpeakerWaveIcon className="h-5 w-5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="flex justify-between mt-8">
                  <Button variant="secondary" onClick={goToPreviousStep}>Previous</Button>
                  <Button 
                    onClick={goToNextStep}
                    className={categoryStyles.accent}
                  >
                    Continue
                  </Button>
                </div>
              </div>
            )}
            
            {/* Practice Step */}
            {currentStepData.type === 'practice' && (
              <div>
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-ios-gray-900 dark:text-white mb-3">{currentStepData.question}</h2>
                  <div className="bg-white/50 dark:bg-dark-200/40 p-4 rounded-xl backdrop-blur-ios">
                    <div className="text-sm text-ios-gray-700 dark:text-white/80 italic mb-2">
                      Choose the most appropriate answer:
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3 mb-6">
                  {currentStepData.options.map((option, index) => (
                    <button
                      key={index}
                      className={`w-full text-left p-4 rounded-xl transition-all ${
                        selectedAnswer === option 
                          ? isCorrect === true 
                            ? 'bg-ios-green/20 border border-ios-green'
                            : isCorrect === false && option === currentStepData.correctAnswer
                              ? 'bg-ios-green/20 border border-ios-green'
                              : isCorrect === false
                                ? 'bg-ios-red/20 border border-ios-red'
                                : `${categoryStyles.gradient} border ${categoryStyles.accent}`
                          : 'bg-white/70 dark:bg-dark-200/70 hover:bg-white dark:hover:bg-dark-200 border border-transparent backdrop-blur-sm'
                      }`}
                      onClick={() => !isCorrect && setSelectedAnswer(option)}
                      disabled={isCorrect !== null}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-ios-gray-200 dark:bg-dark-300 text-xs mr-3">
                            {String.fromCharCode(65 + index)}
                          </span>
                          <span className="font-medium text-ios-gray-900 dark:text-white">{option}</span>
                        </div>
                        {selectedAnswer === option && isCorrect === true && (
                          <CheckCircleIcon className="h-5 w-5 text-ios-green" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
                
                {isCorrect === true && (
                  <div className="bg-ios-green/10 border border-ios-green/30 p-4 rounded-lg mb-6 backdrop-blur-sm">
                    <div className="flex items-start">
                      <CheckCircleIcon className="h-5 w-5 text-ios-green mr-2 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-ios-gray-800 dark:text-white/90 font-medium">Correct!</p>
                        <p className="text-ios-gray-700 dark:text-white/80 text-sm mt-1">
                          {currentStepData.explanation || "Great job! You selected the right answer."}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                
                {isCorrect === false && (
                  <div className="bg-ios-red/10 border border-ios-red/30 p-4 rounded-lg mb-6 backdrop-blur-sm">
                    <div className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 text-ios-red mr-2 flex-shrink-0 mt-0.5">
                        <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
                      </svg>
                      <div>
                        <p className="text-ios-gray-800 dark:text-white/90 font-medium">Not quite right</p>
                        <p className="text-ios-gray-700 dark:text-white/80 text-sm mt-1">
                          The correct answer is "{currentStepData.correctAnswer}". Try again on the next question!
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                
                {showHint && !isCorrect && (
                  <div className="bg-ios-yellow/20 border border-ios-yellow/30 p-4 rounded-lg mb-6 backdrop-blur-sm">
                    <div className="flex items-start">
                      <LightBulbIcon className="h-5 w-5 text-ios-yellow mr-2 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-ios-gray-800 dark:text-white/90 font-medium">Hint</p>
                        <p className="text-ios-gray-700 dark:text-white/80 text-sm mt-1">{currentStepData.hint}</p>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="flex flex-wrap justify-between items-center gap-4 mt-8">
                  <div className="flex space-x-3">
                    <Button variant="secondary" onClick={goToPreviousStep}>Previous</Button>
                    {!isCorrect && (
                      <Button 
                        variant="outline" 
                        onClick={toggleHint}
                        className="flex items-center"
                      >
                        {showHint ? 'Hide Hint' : 'Show Hint'} <LightBulbIcon className="ml-1 h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  
                  <div>
                    {isCorrect === null ? (
                      <Button 
                        onClick={checkAnswer} 
                        disabled={!selectedAnswer}
                        className={!selectedAnswer ? 'opacity-50 cursor-not-allowed' : categoryStyles.accent}
                      >
                        Check Answer
                      </Button>
                    ) : (
                      <Button 
                        onClick={goToNextStep}
                        className={categoryStyles.accent}
                      >
                        Continue
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            )}
            
            {/* Completion Step */}
            {currentStepData.type === 'completion' && (
              <div className="text-center py-8">
                <div className="w-20 h-20 mx-auto bg-ios-green/20 rounded-full flex items-center justify-center mb-6">
                  <CheckCircleIcon className="h-10 w-10 text-ios-green" />
                </div>
                <h2 className="text-2xl font-bold text-ios-gray-900 dark:text-white mb-4">{currentStepData.title}</h2>
                <p className="text-ios-gray-700 dark:text-white/80 mb-8 max-w-2xl mx-auto">{currentStepData.content}</p>
                
                {currentStepData.summary && (
                  <div className="mb-8 bg-white/50 dark:bg-dark-200/30 rounded-xl p-6 max-w-2xl mx-auto backdrop-blur-sm">
                    <h3 className="text-lg font-semibold text-ios-gray-800 dark:text-white mb-4">What You've Learned:</h3>
                    <ul className="space-y-3 text-left">
                      {currentStepData.summary.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <span className="bg-ios-green/20 p-1 rounded-full mr-2 flex-shrink-0 mt-0.5">
                            <CheckCircleIcon className="h-4 w-4 text-ios-green" />
                          </span>
                          <span className="text-ios-gray-700 dark:text-white/80">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <div className="flex flex-wrap justify-center gap-4">
                  <Button 
                    onClick={() => {
                      // Calculate time spent in minutes
                      const timeSpent = Math.round((Date.now() - startTime) / 60000);
                      
                      // Calculate accuracy
                      const accuracy = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;
                      
                      // Count words learned (estimate based on lesson type)
                      const wordsLearned = lesson.category === 'vocabulary' ? 10 : 5;
                      
                      // Update stats
                      updateStats({
                        wordsLearned: userData.stats.wordsLearned + wordsLearned
                      });
                      
                      // Update accuracy separately using weighted average
                      updateAccuracy(accuracy);
                      
                      // Update time distribution separately (also updates totalTime)
                      updateTimeDistribution(lesson.category, timeSpent);
                      
                      // Mark lesson as complete with 100% progress
                      updateProgress(lessonInfo.courseType, id, 100);
                      
                      // Navigate programmatically
                      navigate('/courses');
                    }}
                    className={categoryStyles.accent}
                  >
                    Back to Courses
                  </Button>
                  <Button variant="secondary" onClick={() => setCurrentStep(0)}>
                    <div className="flex items-center">
                      <ArrowPathIcon className="h-5 w-5 mr-2" />
                      Restart Lesson
                    </div>
                  </Button>
                </div>
              </div>
            )}
          </Card>
        </motion.div>
      </motion.section>
    </div>
  );
};

export default LessonPage;