export const RECENT_SEARCH = [
  "Chill Vibes Only",
  "Epic Movie Soundtracks",
  "Rainy Day Blues",
  "Throwback Hits: 90s & 2000s",
  "Summer Road Trip Tunes",
  "Electronic Chillout"
];

export const NOTIFICATIONS = [
  {
    id: "1",
    user: "Anna Smith",
    action: "commented on",
    content: "your playlist 'Chill Vibes'",
    date: new Date(new Date().setMinutes(0)), // This hour, on the 0th minute
    read: false
  },
  {
    id: "2",
    user: "John Doe",
    action: "liked",
    content: "your song 'Ocean Breeze'",
    date: new Date(new Date().setHours(new Date().getHours() - 1, 30, 0)), // 1.5 hours ago
    read: false
  },
  {
    id: "3",
    user: "Emma Johnson",
    action: "shared",
    content: "your album 'Summer Beats' with their followers",
    date: new Date(new Date().setHours(new Date().getHours() - 2, 0, 0)), // 2 hours ago
    read: false
  },
  {
    id: "4",
    user: "Tom Williams",
    action: "requested collaboration on",
    content: "a new playlist 'Road Trip Hits'",
    date: new Date(new Date().setDate(new Date().getDate() - 3)), // Three days ago
    read: true
  },
  {
    id: "5",
    user: "Jane Taylor",
    action: "replied to your comment",
    content: "on the track 'Moonlit Night'",
    date: new Date(new Date().setDate(new Date().getDate() - 4)), // Four days ago
    read: true
  },
  {
    id: "6",
    user: "Chris Brown",
    action: "added your song",
    content: "'Sunset Drive' to their playlist 'Evening Chill'",
    date: new Date(new Date().setDate(new Date().getDate() - 5)), // Five days ago
    read: true
  },
  {
    id: "7",
    user: "Sophia Davis",
    action: "commented on",
    content: "your playlist 'Workout Jams'",
    date: new Date(new Date().setDate(new Date().getDate() - 1)), // Yesterday
    read: true
  },
  {
    id: "8",
    user: "Michael Wilson",
    action: "followed",
    content: "your artist profile",
    date: new Date(new Date().setHours(new Date().getHours() - 4)), // Four hours ago
    read: true
  },
  {
    id: "9",
    user: "Olivia Martinez",
    action: "added a review for",
    content: "your album 'Acoustic Moods'",
    date: new Date(new Date().setHours(new Date().getHours() - 3, 30, 0)), // 3 hours ago
    read: true
  },
  {
    id: "10",
    user: "Liam Anderson",
    action: "tagged you in",
    content: "a post about the concert 'Live at Sunset'",
    date: new Date(new Date().setDate(new Date().getDate() - 2)), // Two days ago
    read: true
  },
  {
    id: "11",
    user: "Sophia Garcia",
    action: "updated",
    content: "your song 'Morning Bliss' to include lyrics",
    date: new Date(new Date().setHours(new Date().getHours() - 6)), // Six hours ago
    read: true
  },
  {
    id: "12",
    user: "Benjamin Clark",
    action: "commented on",
    content: "your album 'Midnight Melodies'",
    date: new Date(new Date().setDate(new Date().getDate() - 7)), // Seven days ago
    read: true
  }
];
