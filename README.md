# Book Tracker

A web application to track personal reading progress, manage reading lists, and get detailed statistics. This project is initially for personal use, with the potential to be released publicly in the future.

## Motivation

Currently, I use a Notion page to maintain my reading list, which includes books I've read, my reading plan, and books I'm currently reading. This setup has several limitations:

1.  **Lack of Statistics:** It's difficult to track my reading progress effectively. I don't know how many books are on my reading list (which I estimate to be over 2000) or get insights into my reading habits.
2.  **Complex Organization:** My reading plan is spread across multiple lists: by author, by genre, uncategorized, recommended, and prioritized lists for different years. While organized, it's cumbersome to manage and get a clear overview.
3.  **Manual Tracking:** Tracking multiple readings of the same book, including start/end dates and listening hours for audiobooks, is a manual process.

This project aims to solve these problems by providing a dedicated platform for book tracking with a focus on powerful statistics and data visualization.

## Core Features

- **Comprehensive Reading Lists:**
    - Track books you have read, are currently reading, and plan to read.
    - Log multiple readings for the same book, including start/end dates and listening time for audiobooks.
    - Manage categorized reading plans (by author, genre) and priority lists.
    - Keep a separate list for books recommended by others.
    - Maintain a wishlist for paper books.
- **Detailed Statistics & Insights:**
    - Get counts of books in every list (e.g., per author, per genre).
    - View and filter book lists by author, genre, or a combination of both.
    - Analyze your reading history across different time scales: per month, per year, or custom date ranges.
    - Visualize all statistical data with charts.
- **Vocabulary Builder:**
    - Keep a personal vocabulary list of new words you encounter.

## Core Entities

The application is modeled around the following core entities:

- **User & Auth:** `User`, `Auth`, `Settings`
- **Books & Content:** `Book`, `Author`, `Genre`, `BookEdition`
- **Tracking:** `Reading`, `Review`, `BookList`
- **Recommendations:** `Recommendation`, `Recommender`
- **Misc:** `Vocabulary`, `Statistics`, `Logs`

## Tech Stack

- **Backend:** Node.js (Express)
- **Frontend:** React (Vite)
- **Database:** MongoDB
