import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ChevronDownIcon, 
  ChevronUpIcon, 
  ArrowTopRightOnSquareIcon,
  BookmarkIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline';
import Card from '../components/Card';
import Badge from '../components/Badge';
import Button from '../components/Button';

const GrammarPage = () => {
  const [expandedSections, setExpandedSections] = useState({});
  
  // Toggle section expansion
  const toggleSection = (id) => {
    setExpandedSections(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };
  
  // Grammar topics data
  const grammarTopics = [
    {
      id: 'basics',
      title: 'Basic Sentence Structure',
      level: 'Beginner',
      color: 'blue',
      description: 'Learn how to form basic German sentences with subjects, verbs, and objects.',
      sections: [
        {
          id: 'subject-verb',
          title: 'Subject-Verb Agreement',
          content: 'In German, verbs must agree with their subjects in person and number. For example, "ich spreche" (I speak) but "wir sprechen" (We speak).',
          examples: [
            { german: 'Ich esse einen Apfel.', english: 'I eat an apple.' },
            { german: 'Du isst einen Apfel.', english: 'You eat an apple.' },
            { german: 'Er/Sie/Es isst einen Apfel.', english: 'He/She/It eats an apple.' },
          ],
        },
        {
          id: 'word-order',
          title: 'Word Order',
          content: 'German generally follows Subject-Verb-Object order in main clauses, but the verb position changes in subordinate clauses and questions. German also has case system that affects articles and adjectives.',
          examples: [
            { german: 'Ich trinke Kaffee.', english: 'I drink coffee.' },
            { german: 'Sie sieht fern.', english: 'She watches television.' },
          ],
        },
      ],
    },
    {
      id: 'articles',
      title: 'Articles',
      level: 'Beginner',
      color: 'green',
      description: 'Learn about definite, indefinite articles and cases in German.',
      sections: [
        {
          id: 'definite-articles',
          title: 'Definite Articles (le, la, les)',
          content: 'German has three grammatical genders (masculine, feminine, and neuter) and four cases. "Der" is used for masculine nouns, "die" for feminine nouns, and "das" for neuter nouns in the nominative case.',
          examples: [
            { german: 'Das Buch liegt auf dem Tisch.', english: 'The book is on the table.' },
            { german: 'Ich mag die Musik.', english: 'I like music.' },
            { german: 'Die Katzen schlafen.', english: 'The cats are sleeping.' },
          ],
        },
        {
          id: 'indefinite-articles',
          title: 'Indefinite Articles (un, une, des)',
          content: 'Indefinite articles in German are "ein" (masculine), "eine" (feminine), and "ein" (neuter) in the nominative case. For plurals, German often uses no article or "einige" for "some".',
          examples: [
            { german: 'Ich habe einen Stift.', english: 'I have a pen.' },
            { german: 'Sie hat eine Idee.', english: 'She has an idea.' },
            { german: 'Es gibt Bücher auf dem Tisch.', english: 'There are books on the table.' },
          ],
        },
      ],
    },
    {
      id: 'present-tense',
      title: 'Present Tense',
      level: 'Beginner',
      color: 'orange',
      description: 'Learn how to conjugate and use verbs in the present tense.',
      sections: [
        {
          id: 'regular-er',
          title: 'Regular -er Verbs',
          content: 'Regular German verbs follow a consistent pattern. Remove the -en ending and add the appropriate ending for the subject.',
          examples: [
            { german: 'Ich spreche Deutsch.', english: 'I speak German.' },
            { german: 'Du sprichst Deutsch.', english: 'You speak German.' },
            { german: 'Er/Sie/Es spricht Deutsch.', english: 'He/She/It speaks German.' },
            { german: 'Wir sprechen Deutsch.', english: 'We speak German.' },
            { german: 'Ihr sprecht Deutsch.', english: 'You (plural) speak German.' },
            { german: 'Sie sprechen Deutsch.', english: 'They/You (formal) speak German.' },
          ],
        },
        {
          id: 'regular-ir',
          title: 'Regular -ir Verbs',
          content: 'Some German verbs have stem changes in the present tense, particularly in the second and third person singular forms.',
          examples: [
            { german: 'Ich lese ein Buch.', english: 'I read a book.' },
            { german: 'Du liest ein Buch.', english: 'You read a book.' },
            { german: 'Er/Sie/Es liest ein Buch.', english: 'He/She/It reads a book.' },
            { german: 'Wir lesen ein Buch.', english: 'We read a book.' },
            { german: 'Ihr lest ein Buch.', english: 'You (plural) read a book.' },
            { german: 'Sie lesen ein Buch.', english: 'They/You (formal) read a book.' },
          ],
        },
      ],
    },
    {
      id: 'adjectives',
      title: 'Adjectives',
      level: 'Beginner',
      color: 'purple',
      description: 'Learn how adjectives agree with nouns in gender and number, and how they are positioned in sentences.',
      sections: [
        {
          id: 'agreement',
          title: 'Agreement with Nouns',
          content: 'In German, adjectives must agree with the nouns they modify in gender, number, and case. The endings change depending on whether they follow a definite article, indefinite article, or no article.',
          examples: [
            { german: 'Ein kleiner Junge', english: 'A small boy' },
            { german: 'Eine kleine Mädchen', english: 'A small girl' },
            { german: 'Kleine Jungen', english: 'Small boys' },
            { german: 'Kleine Mädchen', english: 'Small girls' },
          ],
        },
        {
          id: 'position',
          title: 'Position of Adjectives',
          content: 'In German, attributive adjectives (those that directly describe a noun) always come before the noun, unlike in some other languages where they often come after.',
          examples: [
            { german: 'Ein weißes Haus', english: 'A white house' },
            { german: 'Ein großer Baum', english: 'A tall tree' },
          ],
        },
      ],
    },
  ];
  
  // Get category-specific colors
  const getTopicStyles = (color) => {
    switch(color) {
      case 'blue':
        return {
          widgetVariant: 'widgetBlue',
          accent: 'bg-[#0A58CA] dark:bg-[#0A84FF]',
          button: 'border-[#0A58CA] text-[#0A58CA] dark:border-[#0A84FF] dark:text-[#0A84FF]',
          badge: 'filled-blue',
          headerBg: 'bg-[#D1E5FF]/50 dark:bg-[#0A58CA]/30'
        };
      case 'green':
        return {
          widgetVariant: 'widgetGreen',
          accent: 'bg-[#148F47] dark:bg-[#34C759]',
          button: 'border-[#148F47] text-[#148F47] dark:border-[#34C759] dark:text-[#34C759]',
          badge: 'filled-green',
          headerBg: 'bg-[#D4F7DF]/50 dark:bg-[#148F47]/30'
        };
      case 'orange':
        return {
          widgetVariant: 'widgetOrange',
          accent: 'bg-[#CC5500] dark:bg-[#FF9500]',
          button: 'border-[#CC5500] text-[#CC5500] dark:border-[#FF9500] dark:text-[#FF9500]',
          badge: 'filled-orange',
          headerBg: 'bg-[#FFE2BD]/50 dark:bg-[#CC5500]/30'
        };
      case 'purple':
        return {
          widgetVariant: 'widgetPurple',
          accent: 'bg-[#7C3AED] dark:bg-[#AF52DE]',
          button: 'border-[#7C3AED] text-[#7C3AED] dark:border-[#AF52DE] dark:text-[#AF52DE]',
          badge: 'filled-purple',
          headerBg: 'bg-[#E7D6FF]/50 dark:bg-[#7C3AED]/30'
        };
      default:
        return {
          widgetVariant: 'widgetBlue',
          accent: 'bg-[#0A58CA] dark:bg-[#0A84FF]',
          button: 'border-[#0A58CA] text-[#0A58CA] dark:border-[#0A84FF] dark:text-[#0A84FF]',
          badge: 'filled-blue',
          headerBg: 'bg-[#D1E5FF]/50 dark:bg-[#0A58CA]/30'
        };
    }
  };
  
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
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };
  
  return (
    <div className="py-8">
      {/* Header with Back button */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center">
          <Link to="/" className="mr-4">
            <Button variant="icon" className="bg-white/80 dark:bg-dark-200/80 shadow-sm backdrop-blur-sm">
              <ArrowLeftIcon className="h-6 w-6 text-ios-gray-900 dark:text-white" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-ios-gray-900 dark:text-white">Grammar</h1>
        </div>
      </div>
      
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-6"
      >
        {grammarTopics.map((topic) => {
          const topicStyles = getTopicStyles(topic.color);
          return (
          <motion.div key={topic.id} variants={item}>
            <Card variant={topicStyles.widgetVariant}>
              <div className="mb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center mb-2">
                      <h2 className="text-xl font-bold text-ios-gray-900 dark:text-white mr-3">{topic.title}</h2>
                      <Badge variant={topicStyles.badge}>{topic.level}</Badge>
                    </div>
                    <p className="text-ios-gray-700 dark:text-white/80">{topic.description}</p>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      className={`p-2 border ${topicStyles.button}`}
                      title="Bookmark this topic"
                    >
                      <BookmarkIcon className="h-5 w-5" />
                    </Button>
                    <Link to={`/lesson/${topic.id}`}>
                      <Button className={`p-2 text-white ${topicStyles.accent}`} title="Open as lesson">
                        <ArrowTopRightOnSquareIcon className="h-5 w-5" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                {topic.sections.map((section) => (
                  <div 
                    key={section.id} 
                    className="border border-white/20 dark:border-white/10 rounded-xl overflow-hidden shadow-sm"
                  >
                    <button
                      className={`w-full flex justify-between items-center p-4 text-left ${topicStyles.headerBg} hover:brightness-105 transition-colors`}
                      onClick={() => toggleSection(`${topic.id}-${section.id}`)}
                    >
                      <h3 className="text-lg font-semibold text-ios-gray-900 dark:text-white">{section.title}</h3>
                      {expandedSections[`${topic.id}-${section.id}`] ? (
                        <ChevronUpIcon className="h-5 w-5 text-ios-gray-600 dark:text-white/70" />
                      ) : (
                        <ChevronDownIcon className="h-5 w-5 text-ios-gray-600 dark:text-white/70" />
                      )}
                    </button>
                    
                    {expandedSections[`${topic.id}-${section.id}`] && (
                      <div className="p-4 bg-white/70 dark:bg-dark-200/70 backdrop-blur-sm">
                        <p className="text-ios-gray-700 dark:text-white/80 mb-4">{section.content}</p>
                        
                        {section.examples && (
                          <div>
                            <h4 className="text-md font-medium text-ios-gray-900 dark:text-white mb-2">Examples:</h4>
                            <div className="space-y-2">
                              {section.examples.map((example, idx) => (
                                <div key={idx} className="grid grid-cols-2 gap-2 p-2 bg-white/50 dark:bg-dark-300/50 backdrop-blur-sm rounded-lg">
                                  <div className="text-[#0A58CA] dark:text-[#0A84FF] font-medium">{example.german}</div>
                                  <div className="text-ios-gray-700 dark:text-white/80">{example.english}</div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        )})}
      </motion.div>
    </div>
  );
};

export default GrammarPage;