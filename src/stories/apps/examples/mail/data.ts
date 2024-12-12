export const mails = [
  {
    id: "6c84fb90-12c4-11e1-840d-7b25c5ee775a",
    name: "John Doe",
    email: "johndoe@example.com",
    subject: "Weekly Team Update",
    text: "Hello Team,\n\nHere's the summary of our progress this week. We've achieved several milestones and are on track to meet our goals. Please review the attached report for details.\n\nLet me know if you have any questions or need clarifications.\n\nBest regards, John",
    date: "2023-10-22T09:00:00",
    read: true,
    labels: ["update", "work"]
  },
  {
    id: "110e8400-e29b-11d4-a716-446655440000",
    name: "Emma Davis",
    email: "emmadavis@example.com",
    subject: "Follow-up on Design Review",
    text: "Hi,\n\nThank you for your input during the design review. I've updated the mockups based on your suggestions and attached them for your reference. Please share any additional thoughts before our next meeting.\n\nBest regards, Emma",
    date: "2023-10-22T10:30:00",
    read: true,
    labels: ["work", "design"]
  },
  {
    id: "3e7c3f6d-bdf5-46ae-8d90-171300f27ae2",
    name: "Liam Brown",
    email: "liambrown@example.com",
    subject: "Weekend Getaway Plans",
    text: "Hi,\n\nI was thinking of organizing a weekend trip to the countryside. It’ll be a great way to relax and recharge. Let me know if you’re interested, and we can sort out the details.\n\nCheers, Liam",
    date: "2023-04-10T11:45:00",
    read: true,
    labels: ["personal"]
  },
  {
    id: "61c35085-72d7-42b4-8d62-738f700d4b92",
    name: "Olivia Moore",
    email: "oliviamoore@example.com",
    subject: "Budget Adjustments",
    text: "Hi,\n\nI've reviewed the budget and identified areas for improvement. The details are in the attached document. Let’s discuss this in our next meeting.\n\nThanks, Olivia",
    date: "2023-03-25T13:15:00",
    read: false,
    labels: ["work", "budget"]
  },
  {
    id: "8f7b5db9-d935-4e42-8e05-1f1d0a3dfb97",
    name: "Ethan Taylor",
    email: "ethantaylor@example.com",
    subject: "Team Announcement",
    text: "Hello Team,\n\nWe have some exciting updates to share about our upcoming product launch. I look forward to discussing the details in our next meeting.\n\nBest regards, Ethan",
    date: "2023-03-10T15:00:00",
    read: false,
    labels: ["work", "announcement"]
  },
  {
    id: "1f0f2c02-e299-40de-9b1d-86ef9e42126b",
    name: "Sophia Miller",
    email: "sophiamiller@example.com",
    subject: "Updated Proposal Review",
    text: "Hi,\n\nI’ve incorporated your feedback into the updated proposal. Please review the attached document and share any additional suggestions.\n\nThanks, Sophia",
    date: "2023-02-15T16:30:00",
    read: true,
    labels: ["work"]
  },
  {
    id: "17c0a96d-4415-42b1-8b4f-764efab57f66",
    name: "Noah White",
    email: "noahwhite@example.com",
    subject: "Brainstorming Session",
    text: "Hi,\n\nI’ve got a few ideas for our new project that I’d like to share. Let’s schedule a brainstorming session to discuss.\n\nRegards, Noah",
    date: "2023-01-28T17:45:00",
    read: false,
    labels: ["meeting", "ideas"]
  },
  {
    id: "2f0130cb-39fc-44c4-bb3c-0a4337edaaab",
    name: "Mia Clark",
    email: "miaclark@example.com",
    subject: "Vacation Planning",
    text: "Hi,\n\nI’ve shortlisted a few destinations for our vacation next month. Please review and let me know your preferences.\n\nBest, Mia",
    date: "2022-12-20T18:30:00",
    read: true,
    labels: ["personal"]
  },
  {
    id: "de305d54-75b4-431b-adb2-eb6b9e546014",
    name: "William Harris",
    email: "williamharris@example.com",
    subject: "Conference Preparations",
    text: "Hi,\n\nI’ve completed the conference registration and attached the schedule. Let me know if there are specific sessions you’d like me to attend.\n\nBest, William",
    date: "2022-11-30T19:15:00",
    read: true,
    labels: ["work", "conference"]
  },
  {
    id: "7dd90c63-00f6-40f3-bd87-5060a24e8ee7",
    name: "Ella Jones",
    email: "ellajones@example.com",
    subject: "Celebration Dinner",
    text: "Hi Team,\n\nLet’s celebrate our achievements with a team dinner next week. Please confirm your availability and dietary preferences.\n\nBest, Ella",
    date: "2022-11-05T20:30:00",
    read: false,
    labels: ["celebration", "team"]
  },
  {
    id: "99a88f78-3eb4-4d87-87b7-7b15a49a0a05",
    name: "James Wilson",
    email: "jameswilson@example.com",
    subject: "Project Feedback",
    text: "Hi,\n\nI’ve reviewed the latest project deliverables and attached my comments. Let me know if you need further input.\n\nBest regards, James",
    date: "2022-10-01T15:00:00",
    read: false,
    labels: ["feedback", "work"]
  }
];

export type Mail = (typeof mails)[number];

export const accounts = [
  {
    label: "Judith Black",
    email: "judith@example.com",
    icon: "🌸"
  },
  {
    label: "Judith Black",
    email: "judith@gmail.com",
    icon: "🎀"
  },
  {
    label: "Judith Black",
    email: "judith@me.com",
    icon: "💖"
  }
];
