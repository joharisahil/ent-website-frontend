/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export enum UserRole {
  SUPER_ADMIN = "SUPER_ADMIN",
  ADMIN = "ADMIN",
  MEMBER = "MEMBER",
  EDITOR = "EDITOR", // future
  CREATOR = "CREATOR", // future
}

export enum UserStatus {
  PENDING_VERIFICATION = "PENDING_VERIFICATION",
  ACTIVE = "ACTIVE",
  SUSPENDED = "SUSPENDED",
  BLOCKED = "BLOCKED",
  DELETED = "DELETED",
}

export enum AuthProvider {
  EMAIL = "EMAIL",
  GOOGLE = "GOOGLE",
}

export enum MembershipStatus {
  NONE = "NONE",
  ACTIVE = "ACTIVE",
  EXPIRED = "EXPIRED",
  CANCELLED = "CANCELLED",
}

export enum Theme {
  LIGHT = "LIGHT",
  DARK = "DARK",
  SYSTEM = "SYSTEM",
}

export interface UserPreferences {
  theme: Theme;
  emailNotifications: boolean;
  marketingEmails: boolean;
}

export interface LoginMetadata {
  lastLoginAt: string;
  lastLoginIp: string;
  lastLoginDevice: string;
}

export interface EmailVerification {
  isVerified: boolean;
  verifiedAt?: string;
  verificationToken?: string;
  verificationTokenExpiresAt?: string;
}

export interface PasswordReset {
  resetToken?: string;
  resetTokenExpiresAt?: string;
}

export interface MembershipSnapshot {
  status: MembershipStatus;
  planId: string; // "pro" | "premium"
  planName: string;
  expiresAt: string;
}

export interface User {
  id: string;
  fullName: string;
  email: string;
  avatar?: string;
  role: UserRole;
  status: UserStatus;
  provider: AuthProvider;
  preferences: UserPreferences;
  membership?: MembershipSnapshot;
  loginMetadata?: LoginMetadata;
  createdAt: string;
  updatedAt: string;
}

// Subject, Section, Chapter, Topic learning structures
export interface Subject {
  id: string;
  name: string;
  slug: string;
  description: string;
  image?: string;
  topicsCount: number;
  chaptersCount: number;
}

export interface Section {
  id: string;
  subjectId: string;
  name: string;
  order: number;
}

export interface Chapter {
  id: string;
  subjectId: string;
  sectionId: string;
  name: string;
  description: string;
  order: number;
}

export interface Topic {
  id: string;
  subjectId: string;
  sectionId: string;
  chapterId: string;
  title: string;
  slug: string;
  summary: string;
  content: string; // rich HTML content
  isPremium: boolean;
  pdfUrl?: string;
  pdfSize?: string;
  readingTime: number; // in minutes
  order: number;
  status: "DRAFT" | "PUBLISHED" | "SCHEDULED";
  seoTitle?: string;
  seoDescription?: string;
  canonicalUrl?: string;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Bookmark {
  id: string;
  userId: string;
  topicId: string;
  bookmarkedAt: string;
}

export interface Download {
  id: string;
  userId: string;
  topicId: string;
  topicTitle: string;
  downloadedAt: string;
}

export interface ReadingHistory {
  id: string;
  userId: string;
  topicId: string;
  topicTitle: string;
  progress: number; // percentage (0 - 100)
  lastReadAt: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "warning" | "success" | "promotion";
  read: boolean;
  createdAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
  };
}
