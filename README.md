#  FitLog — Workout Library & Gym Companion

FitLog is a dark-themed, responsive gym companion web application built with **Next.js 14 (App Router)** and **Tailwind CSS**. It allows users to browse an extensive library of workouts, view detailed specs and instructions for each lift, log exercises into today's workout plan (up to a 5-lift daily cap), save lifts for later, and track metrics such as total exercises, workout duration, and calories burned in real-time.

---

##  Technologies Used
- **Framework:** Next.js 14 (App Router, Server & Client Components)
- **Styling:** Tailwind CSS, Custom Dark Theme (`#09090b` background with `#ccff00` neon accent)
- **Icons:** Lucide React
- **State & Persistence:** React Context API + LocalStorage Synchronization
- **API Data:** RESTful API (`https://api.abcz.workers.dev/api/fitlog`)

---

##  5 Key Features

1. ** Workout Library with Real-Time Filtering & Dynamic Sorting**
   - Displays all exercises from the API in a responsive 3x4 grid on desktop.
   - Filter workouts by muscle group tags (`CHEST`, `ARMS`, `LEGS`, `CORE`, etc.) or live search keywords.
   - Dynamically sort lifts by **Duration**, **Calories Burned**, or **Rating**.

2. ** Dynamic Daily Workout Planner (`/my-plan`)**
   - Manage **Today's Plan** and **Saved** workouts with tabbed navigation.
   - Enforces a strict 5-lift cap for today's plan to encourage focused workout sessions.
   - Live metrics summary cards tracking total **Exercises**, **Minutes**, and **Calories Burned**.

3. ** Interactive Completion & Workout Tracking (Challenge C3)**
   - Mark exercises as completed ("Mark as Done") with visual indicators and animated badges.
   - Remove items from today's plan or saved list with instant UI updates and metric recalculations.

4. ** Responsive Gym Companion UI & Detailed Specs (`/workout/[id]`)**
   - Two-column detail page layout featuring high-res imagery, muscle group tags, key specs panel (equipment, difficulty, sets/reps, duration, calories, rating), and 4-step ordered instructions.

5. ** LocalStorage Persistence & Custom Toast Notifications**
   - Persists all planned and saved workout selections locally across page reloads.
   - Interactive toast notifications providing feedback for adding, completing, or removing lifts.
