import UniEvent_Logo from './UniEvent_Logo.jpg';
import tech_innovators_logo from '../assets/tech_innovators_logo.png'
import cultural_arts_logo from '../assets/cultural_arts_logo.png'
import green_earth_logo from '../assets/green_earth_logo.png'
import literary_club_logo from '../assets/literary_club_logo.png'
import sports_fitness_club_logo from '../assets/sports_fitness_club_logo.png'

export const club_list = [
  {
    _id:1,
    name: "Tech Innovators Club",
    about: "A community of students passionate about coding, hackathons, and emerging technologies like AI and blockchain.",
    lead_by: "Rohan Mehta",
    contact: "techinnovators@campus.org",
    image: tech_innovators_logo
  },
  {
    _id:2,
    name: "Cultural Arts Society",
    about: "Dedicated to promoting dance, music, and theater through workshops, performances, and cultural festivals.",
    lead_by: "Ananya Sharma",
    contact: "culturalarts@campus.org",
    image: cultural_arts_logo
  },
  {
    _id:3,
    name: "Green Earth Club",
    about: "Focused on sustainability, tree plantation drives, and spreading awareness about climate change and eco-friendly practices.",
    lead_by: "Aarav Singh",
    contact: "greenearth@campus.org",
    image: green_earth_logo
  },
  {
    _id:4,
    name: "Literary Circle",
    about: "A space for writers, poets, and readers to share their work, host debates, and organize book discussions.",
    lead_by: "Priya Kapoor",
    contact: "literarycircle@campus.org",
    image: literary_club_logo
  },
  {
    _id:5,
    name: "Sports & Fitness Club",
    about: "Encourages physical fitness and teamwork through regular sports events, tournaments, and fitness challenges.",
    lead_by: "Kabir Malhotra",
    contact: "sportsclub@campus.org",
    image: sports_fitness_club_logo
  }
]

// events.js

export const event_list = [
  {
    _id: "evt001",
    name: "Tech Symposium 2026",
    about: "Annual showcase of student innovations, research papers, and tech talks.",
    club: "Computer Science Club",
    time: "10:00 AM",
    date: "2026-01-28",
    place: "Auditorium A"
  },
  {
    _id: "evt002",
    name: "Cultural Fest",
    about: "A celebration of diverse cultures with music, dance, and food stalls.",
    club: "Cultural Committee",
    time: "5:00 PM",
    date: "2026-01-27",
    place: "Main Ground"
  },
  {
    _id: "evt003",
    name: "Debate Championship",
    about: "Inter-college debate competition on current global issues.",
    club: "Literary Society",
    time: "2:00 PM",
    date: "2026-01-27",
    place: "Seminar Hall 2"
  },
  {
    _id: "evt004",
    name: "Hackathon 48",
    about: "48-hour coding marathon to build innovative solutions.",
    club: "Coding Club",
    time: "9:00 AM",
    date: "2026-04-10",
    place: "Innovation Lab"
  },
  {
    _id: "evt005",
    name: "Photography Exhibition",
    about: "Display of student photography projects and creative captures.",
    club: "Photography Club",
    time: "11:00 AM",
    date: "2026-02-25",
    place: "Art Gallery"
  },
  {
    _id: "evt006",
    name: "Drama Night",
    about: "Stage performances of classic and modern plays.",
    club: "Drama Club",
    time: "6:30 PM",
    date: "2026-03-12",
    place: "Open Air Theatre"
  },
  {
    _id: "evt007",
    name: "Startup Pitch Day",
    about: "Students present startup ideas to industry mentors and investors.",
    club: "Entrepreneurship Cell",
    time: "3:00 PM",
    date: "2026-04-05",
    place: "Conference Hall"
  },
  {
    _id: "evt008",
    name: "Robotics Challenge",
    about: "Competition featuring autonomous robots built by student teams.",
    club: "Robotics Club",
    time: "1:00 PM",
    date: "2026-03-20",
    place: "Mechanical Workshop"
  },
  {
    _id: "evt009",
    name: "Music Concert",
    about: "Live performances by student bands and guest artists.",
    club: "Music Club",
    time: "7:00 PM",
    date: "2026-03-25",
    place: "Central Lawn"
  },
  {
    _id: "evt010",
    name: "Sports Meet",
    about: "Annual athletics and sports competitions across disciplines.",
    club: "Sports Committee",
    time: "8:00 AM",
    date: "2026-02-28",
    place: "Sports Complex"
  }
];


export const assets = {
    UniEvent_Logo
};