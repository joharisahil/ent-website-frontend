/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect } from "react";
import { User, Topic, Chapter, Subject, Section, Bookmark, Download, ReadingHistory, Notification, UserRole, UserStatus, AuthProvider, MembershipStatus, Theme } from "../types";
import { MOCK_SUBJECTS, MOCK_SECTIONS, MOCK_CHAPTERS, MOCK_TOPICS, DEMO_USERS } from "../data/mockData";

export interface ToastMessage {
  id: string;
  message: string;
  type: "success" | "error" | "info" | "warning";
}

interface AppContextType {
  // Navigation
  currentRoute: string;
  routeParams: Record<string, string>;
  navigateTo: (route: string) => void;

  // Authentication
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  loginAs: (role: "guest" | "member" | "admin") => void;
  logout: () => void;

  // DB Entities (with live CRUD state)
  subjects: Subject[];
  sections: Section[];
  chapters: Chapter[];
  topics: Topic[];
  setTopics: React.Dispatch<React.SetStateAction<Topic[]>>;
  addTopic: (topic: Omit<Topic, "id" | "createdAt" | "updatedAt">) => void;
  updateTopic: (id: string, updated: Partial<Topic>) => void;
  deleteTopic: (id: string) => void;

  // User Interactive Actions
  bookmarks: Bookmark[];
  addBookmark: (topicId: string) => void;
  removeBookmark: (topicId: string) => void;
  isBookmarked: (topicId: string) => boolean;

  downloads: Download[];
  triggerDownload: (topicId: string) => boolean; // returns true if allowed

  readingHistory: ReadingHistory[];
  updateReadingProgress: (topicId: string, progress: number) => void;

  notifications: Notification[];
  markNotificationRead: (id: string) => void;
  addNotification: (title: string, message: string, type: Notification["type"]) => void;

  // Search
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Toasts
  toasts: ToastMessage[];
  showToast: (message: string, type?: ToastMessage["type"]) => void;
  dismissToast: (id: string) => void;

  // System settings
  activeTheme: Theme;
  setActiveTheme: (theme: Theme) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Client-Side Hash Router
  const [currentRoute, setCurrentRoute] = useState<string>("home");
  const [routeParams, setRouteParams] = useState<Record<string, string>>({});

  const parseHash = () => {
    const hash = window.location.hash || "#/home";
    const path = hash.replace(/^#\//, "");

    if (path.startsWith("topic/")) {
      const slug = path.split("/")[1] || "";
      setCurrentRoute("topic");
      setRouteParams({ slug });
    } else {
      setCurrentRoute(path);
      setRouteParams({});
    }
  };

  useEffect(() => {
    parseHash();
    window.addEventListener("hashchange", parseHash);
    return () => window.removeEventListener("hashchange", parseHash);
  }, []);

  const navigateTo = (route: string) => {
    // If route contains parameters, construct the hash
    if (route.startsWith("topic/")) {
      window.location.hash = `#/${route}`;
    } else {
      window.location.hash = `#/${route}`;
    }
  };

  // 2. Auth State
  const [currentUser, setCurrentUserState] = useState<User | null>(() => {
    const stored = localStorage.getItem("ent_current_user");
    if (stored) {
      try { return JSON.parse(stored); } catch (e) { return null; }
    }
    return null; // default guest
  });

  const setCurrentUser = (user: User | null) => {
    setCurrentUserState(user);
    if (user) {
      localStorage.setItem("ent_current_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("ent_current_user");
    }
  };

  const loginAs = (role: "guest" | "member" | "admin") => {
    if (role === "guest") {
      setCurrentUser(null);
      showToast("Signed in as Guest. PDF downloads are restricted.", "info");
    } else if (role === "member") {
      const memberUser = { ...DEMO_USERS.member };
      setCurrentUser(memberUser);
      showToast(`Welcome back, ${memberUser.fullName}! (Member Account)`, "success");
    } else if (role === "admin") {
      const adminUser = { ...DEMO_USERS.admin };
      setCurrentUser(adminUser);
      showToast(`Logged in as Admin: ${adminUser.fullName}`, "success");
    }
  };

  const logout = () => {
    setCurrentUser(null);
    showToast("Successfully logged out.", "info");
    navigateTo("home");
  };

  // 3. Live Entities (backed by LocalStorage to ensure active CRUD survives refresh)
  const [subjects] = useState<Subject[]>(MOCK_SUBJECTS);
  const [sections] = useState<Section[]>(MOCK_SECTIONS);
  const [chapters, setChapters] = useState<Chapter[]>(() => {
    const stored = localStorage.getItem("ent_chapters");
    return stored ? JSON.parse(stored) : MOCK_CHAPTERS;
  });

  const [topics, setTopics] = useState<Topic[]>(() => {
    const stored = localStorage.getItem("ent_topics");
    return stored ? JSON.parse(stored) : MOCK_TOPICS;
  });

  useEffect(() => {
    localStorage.setItem("ent_topics", JSON.stringify(topics));
  }, [topics]);

  useEffect(() => {
    localStorage.setItem("ent_chapters", JSON.stringify(chapters));
  }, [chapters]);

  // CRUD Operations
  const addTopic = (topicData: Omit<Topic, "id" | "createdAt" | "updatedAt">) => {
    const newTopic: Topic = {
      ...topicData,
      id: `topic-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setTopics(prev => [newTopic, ...prev]);
    showToast(`Topic "${newTopic.title}" created successfully!`, "success");
    addNotification("New Study Notes Added", `"${newTopic.title}" is now available under ${newTopic.isPremium ? "Premium" : "Free"} content.`, "success");
  };

  const updateTopic = (id: string, updatedFields: Partial<Topic>) => {
    setTopics(prev => prev.map(t => {
      if (t.id === id) {
        return {
          ...t,
          ...updatedFields,
          updatedAt: new Date().toISOString()
        };
      }
      return t;
    }));
    showToast("Topic updated successfully!", "success");
  };

  const deleteTopic = (id: string) => {
    const topicToDelete = topics.find(t => t.id === id);
    setTopics(prev => prev.filter(t => t.id !== id));
    showToast(`Deleted topic "${topicToDelete?.title || "notes"}"`, "warning");
  };

  // 4. Interactive Bookmarks
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(() => {
    const stored = localStorage.getItem("ent_bookmarks");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("ent_bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  const addBookmark = (topicId: string) => {
    if (!currentUser) {
      showToast("Please log in to bookmark pages.", "warning");
      navigateTo("auth/login");
      return;
    }
    if (bookmarks.some(b => b.topicId === topicId && b.userId === currentUser.id)) return;

    const newBookmark: Bookmark = {
      id: `bmark-${Date.now()}`,
      userId: currentUser.id,
      topicId,
      bookmarkedAt: new Date().toISOString()
    };
    setBookmarks(prev => [...prev, newBookmark]);
    showToast("Added to your Bookmarks", "success");
  };

  const removeBookmark = (topicId: string) => {
    if (!currentUser) return;
    setBookmarks(prev => prev.filter(b => !(b.topicId === topicId && b.userId === currentUser.id)));
    showToast("Removed from Bookmarks", "info");
  };

  const isBookmarked = (topicId: string) => {
    if (!currentUser) return false;
    return bookmarks.some(b => b.topicId === topicId && b.userId === currentUser.id);
  };

  // 5. Interactive Downloads (GUEST vs MEMBER permission rule)
  const [downloads, setDownloads] = useState<Download[]>(() => {
    const stored = localStorage.getItem("ent_downloads");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("ent_downloads", JSON.stringify(downloads));
  }, [downloads]);

  const triggerDownload = (topicId: string) => {
    const targetTopic = topics.find(t => t.id === topicId);
    if (!targetTopic) return false;

    // Check permissions
    if (!currentUser) {
      // GUEST clicks download -> trigger modal/login prompt
      showToast("Guest account. PDF downloads require active Membership.", "warning");
      // Save current topic slug in temp storage to auto-resume download after login
      localStorage.setItem("ent_redirect_download_topic_id", topicId);
      navigateTo("auth/login");
      return false;
    }

    // Members and Admins can download
    const newDownload: Download = {
      id: `dl-${Date.now()}`,
      userId: currentUser.id,
      topicId,
      topicTitle: targetTopic.title,
      downloadedAt: new Date().toISOString()
    };

    setDownloads(prev => [newDownload, ...prev]);
    showToast(`Downloaded: ${targetTopic.title} PDF!`, "success");
    addNotification("PDF Download Complete", `The PDF for "${targetTopic.title}" was saved.`, "info");
    return true;
  };

  // 6. Reading History Progress Tracker
  const [readingHistory, setReadingHistory] = useState<ReadingHistory[]>(() => {
    const stored = localStorage.getItem("ent_reading_history");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("ent_reading_history", JSON.stringify(readingHistory));
  }, [readingHistory]);

  const updateReadingProgress = (topicId: string, progress: number) => {
    if (!currentUser) return; // only track for members / admins
    const targetTopic = topics.find(t => t.id === topicId);
    if (!targetTopic) return;

    setReadingHistory(prev => {
      const existingIdx = prev.findIndex(h => h.topicId === topicId && h.userId === currentUser.id);
      const now = new Date().toISOString();

      if (existingIdx > -1) {
        const updated = [...prev];
        // Only update if progress is higher or it's a new session
        updated[existingIdx] = {
          ...updated[existingIdx],
          progress: Math.max(updated[existingIdx].progress, progress),
          lastReadAt: now
        };
        return updated;
      } else {
        return [{
          id: `read-${Date.now()}`,
          userId: currentUser.id,
          topicId,
          topicTitle: targetTopic.title,
          progress,
          lastReadAt: now
        }, ...prev];
      }
    });
  };

  // 7. Core Notifications State
  const [notifications, setNotifications] = useState<Notification[]>(() => {
    const stored = localStorage.getItem("ent_notifications");
    return stored ? JSON.parse(stored) : [
      {
        id: "notif-1",
        title: "Welcome to ENT Learning Platform",
        message: "Unlock your career in otolaryngology with high-yield study guides created by Dr. Pulkit Agarwal.",
        type: "success",
        read: false,
        createdAt: new Date(Date.now() - 3600000 * 24).toISOString()
      },
      {
        id: "notif-2",
        title: "Tracheostomy Anatomy Notes Released",
        message: "Check out the newly published surgical notes outlining high-yield landmarks for tracheostomy placement.",
        type: "info",
        read: true,
        createdAt: new Date(Date.now() - 3600000 * 72).toISOString()
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem("ent_notifications", JSON.stringify(notifications));
  }, [notifications]);

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const addNotification = (title: string, message: string, type: Notification["type"]) => {
    const newNotif: Notification = {
      id: `notif-${Date.now()}`,
      title,
      message,
      type,
      read: false,
      createdAt: new Date().toISOString()
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  // 8. Global Search Query State
  const [searchQuery, setSearchQuery] = useState<string>("");

  // 9. Floating Custom Toasts System
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = (message: string, type: ToastMessage["type"] = "success") => {
    const id = `toast-${Date.now()}`;
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => dismissToast(id), 4000);
  };

  const dismissToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // 10. Theme System
  const [activeTheme, setActiveThemeState] = useState<Theme>(() => {
    const stored = localStorage.getItem("ent_theme");
    return (stored as Theme) || Theme.LIGHT;
  });

  const setActiveTheme = (theme: Theme) => {
    setActiveThemeState(theme);
    localStorage.setItem("ent_theme", theme);
  };

  // Keep body class synced with activeTheme
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("dark");
    if (activeTheme === Theme.DARK) {
      root.classList.add("dark");
    } else if (activeTheme === Theme.SYSTEM) {
      const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      if (systemDark) {
        root.classList.add("dark");
      }
    }
  }, [activeTheme]);

  return (
    <AppContext.Provider
      value={{
        currentRoute,
        routeParams,
        navigateTo,

        currentUser,
        setCurrentUser,
        loginAs,
        logout,

        subjects,
        sections,
        chapters,
        topics,
        setTopics,
        addTopic,
        updateTopic,
        deleteTopic,

        bookmarks,
        addBookmark,
        removeBookmark,
        isBookmarked,

        downloads,
        triggerDownload,

        readingHistory,
        updateReadingProgress,

        notifications,
        markNotificationRead,
        addNotification,

        searchQuery,
        setSearchQuery,

        toasts,
        showToast,
        dismissToast,

        activeTheme,
        setActiveTheme
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
