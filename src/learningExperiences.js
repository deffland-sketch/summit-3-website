/**
 * Learning experiences, grouped under the three model elements. Some experiences
 * show up in more than one element; each is listed once, under the element it
 * mainly serves, and the overlap is called out in the copy.
 *
 * `science` is the short learning-science note shown on the How It Works page.
 * Notes are carried over from the earlier learning-science panel; experiences
 * without one have no note yet. Academic Core lists the three experiences Sierra
 * flexes first.
 */
export const learningExperiences = {
  academic: [
    {
      name: 'Direct instruction',
      description: 'A knowledgeable adult teaches something specific. A lesson, a demonstration, a worked example, or a lab walkthrough.',
      eg: 'e.g., small-group lesson, science demo, guest expert',
      science: 'Research on how memory works shows that new concepts stick when an expert breaks them down into manageable pieces, connects them to what students already know, and models their own thinking process. Direct instruction is one of the most well-studied and effective approaches in education, and it works best in smaller groups where the teacher can gauge understanding in real time.',
    },
    {
      name: 'Practice and feedback',
      description: 'A student practices a specific skill while receiving targeted, timely feedback from someone who can diagnose what’s working.',
      eg: 'e.g., writing conference, tutoring session, skills clinic',
      science: 'Decades of research show that effective practice happens at the edge of what a student can do: not too easy, not too hard. The critical ingredient is feedback that’s specific, immediate, and actionable. When practice is spaced across days rather than crammed into one session, retention improves dramatically.',
    },
    {
      name: 'Discussion and dialogue',
      description: 'Students and adults engage in structured conversation about ideas, texts, or problems. The learning happens in the exchange.',
      eg: 'e.g., Socratic seminar, reading circle, peer critique',
      science: 'When students build on each other’s reasoning, they reach deeper understanding than any individual study can produce. Research consistently shows that this kind of interactive engagement is the most powerful mode of learning, and it simultaneously builds the communication and collaboration skills that matter beyond school.',
    },
    {
      name: 'Independent work',
      description: 'A student works on their own to produce something: writing, research, a model, a solution. The student makes the decisions.',
      eg: 'e.g., essay, research project',
      science: 'Producing original work requires students to organize, connect, and apply what they know, which deepens understanding far more than reviewing notes or re-reading. Independent work also develops metacognition: the ability to plan, monitor, and adjust your own learning process, one of the strongest predictors of long-term academic success.',
    },
  ],
  mentoring: [
    {
      name: 'One-on-one check-ins with a mentor',
      description: 'A student meets with the mentor who knows them best to talk through progress, goals, and what comes next.',
      eg: 'e.g., pathway check-in, one-on-one mentor conference',
    },
    {
      name: 'Community time in a constant mentor group',
      description: 'The same mentor and core group of peers, all year: time for social connection, belonging, and community.',
      eg: 'e.g., community launch, end-of-day community building, eating together',
      science: 'Cognitive engagement depends on physical and psychological readiness. Students who are hungry, stressed, isolated, or physically restless cannot access the learning in the rest of the day. Naming community time as part of the schedule signals that the model is designed for whole humans.',
    },
    {
      name: 'Goal setting and reflection',
      description: 'A student steps back to examine their own learning: where they are, where they’re going, what’s working, what to adjust.',
      eg: 'e.g., goal-setting session, self-assessment',
      science: 'The ability to think about your own thinking (metacognition) is the single strongest predictor of academic achievement. Without goal setting and reflection, a personalized pathway is something done to students. With it, students become co-authors of their own trajectory.',
    },
    {
      name: 'Personalized Learning Plan meetings',
      description: 'A student, their mentor, and their family look at the student’s Personalized Learning Plan and pathway together.',
      eg: 'e.g., PLP check-in, family conference',
    },
  ],
  ccl: [
    {
      name: 'Expeditions',
      description: 'Summit’s program for career-connected learning, graduated from expose to explore to pursue.',
      eg: 'e.g., job shadow, Expedition project, site visit',
      science: 'Research on how expertise develops shows that mastery comes from participating in real communities of practice. Real-world experiences build the portfolio that employers and colleges value, and they give students concrete answers to the questions driving their pathway.',
    },
    {
      name: 'Internships',
      description: 'A student learns by participating in authentic work alongside professionals or community members, in settings beyond the school building.',
      eg: 'e.g., design internship, clinical rotation',
    },
    {
      name: 'College courses',
      description: 'College-level courses that earn credit before graduation.',
      eg: 'e.g., dual enrollment, community college course',
    },
    {
      name: 'Industry credentials',
      description: 'Certifications employers recognize, earned during high school.',
      eg: 'e.g., CNA healthcare, Google tech',
    },
    {
      name: 'Exhibitions of learning',
      description: 'A student demonstrates learning to an authentic audience. The stakes are real.',
      eg: 'e.g., exhibition of learning, portfolio defense, speech',
      science: 'Presenting under real conditions is one of the most powerful ways to consolidate learning. It requires students to retrieve, organize, and communicate their knowledge without scaffolding. It also builds identity: "I am someone who can do this." Employers consistently rank communication, poise, and adaptability among the skills that matter most.',
    },
  ],
}

export const researchCitation = 'These learning experiences are grounded in research from the science of learning and development: Hendrick & Kirschner, Chi, Kolb, Lave & Wenger, Deci & Ryan, Transcend Education, and Deans for Impact. Each one activates the conditions under which learning is most effective: spaced practice, immediate feedback, students building on each other’s thinking, new knowledge connecting to prior experience, and learner agency.'
