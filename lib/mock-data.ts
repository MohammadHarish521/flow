import { Note } from './notes';

export const mockNotes: Note[] = [
  {
    id: '1',
    category: 'Work',
    title: 'Q1 Project Planning...',
    description: 'Discussed key milestones: - Frontend redesign by March - API migration by February - Load testing completion by January Action items: 1. Sarah to finalize design system 2. Mike to setup CI/CD pipeline 3. Schedule weekly progress...',
    timestamp: 'about 1 year ago',
    isFavorite: false,
  },
  {
    id: '2',
    category: 'Travel',
    title: 'Japan Travel Itinerary',
    description: 'Tokyo (5 days): - Shibuya Crossing - TeamLab Borderless - Tsukiji Market Kyoto (4 days): - Fushimi Inari - Arashiyama Bamboo Grove - Kinkaku-ji Osaka (3 days): - Dotonbori - Osaka Castle - Universal Studios',
    timestamp: '12 months ago',
    isFavorite: false,
  },
  {
    id: '3',
    category: 'Projects',
    title: 'React Performance...',
    description: 'Key techniques: 1. useMemo for expensive calculations 2. useCallback for function memoization 3. React.memo for component memoization 4. Virtual list for large datasets 5. Code splitting with lazy loading Tools: - React DevTool...',
    timestamp: '11 months ago',
    isFavorite: false,
  },
  {
    id: '4',
    category: 'Personal',
    title: 'Home Workout Routine',
    description: 'Circuit Training (30 mins): 1. 20 pushups 2. 30 squats 3. 15 burpees 4. 1 min plank 5. 20 lunges each leg Repeat 3 times Rest 1 min between sets Cardio: - 20 min HIIT - 5 min cooldown',
    timestamp: '11 months ago',
    isFavorite: false,
  },
  {
    id: '5',
    category: 'Personal',
    title: 'Photography Settings',
    description: 'Landscape Settings: - f/8 to f/11 aperture - ISO 100 - Tripod recommended Portrait Settings: - f/1.8 to f/2.8 - Fast shutter speed - Natural lighting preferred Night Photography: - High ISO (1600+) - Slow shutter speed ...',
    timestamp: 'about 1 year ago',
    isFavorite: false,
  },
  {
    id: '6',
    category: 'Personal',
    title: 'Mediterranean Recipe...',
    description: 'Greek Salad: - Cucumber - Tomatoes - Red onion - Feta cheese - Kalamata olives - Olive oil - Oregano Hummus: - Chickpeas - Tahini - Garlic - Lemon juice - Olive oil - Cumin',
    timestamp: '12 months ago',
    isFavorite: false,
  },
  {
    id: '7',
    category: 'Education',
    title: '2025 Reading List',
    description: "Currently Reading: 1. 'Dune: Messiah' by Frank Herbert 2. 'The Pragmatic Programmer' To Read Next: - 'Snow Crash' by Neal Stephenson - 'Clean Architecture' by Robert Martin - 'Foundation' by Isaac Asimov - 'The...",
    timestamp: '11 months ago',
    isFavorite: false,
  },
  {
    id: '8',
    category: 'Finance',
    title: 'Personal Finance Tracker',
    description: 'Monthly Budget: - Rent: $2000 - Utilities: $200 - Groceries: $500 - Transportation: $150 - Entertainment: $300 - Savings: $1000 Investments: - 401k: 15% of income - Index funds: $500/month - Emergency fund: 6...',
    timestamp: '11 months ago',
    isFavorite: false,
  }
];
