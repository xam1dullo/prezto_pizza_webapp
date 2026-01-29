# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server on port 4000
- `npm run build` - Build production version with Vite
- `npm run preview` - Preview production build locally

## Architecture

This is a React 19 + TypeScript + Vite pizza ordering web app with:

- **Main App Component** (`App.tsx`): Central state management for cart, checkout modal, category filtering
- **Component Structure**: Modular components in `/components/` directory
- **State Management**: React hooks (useState, useCallback, useMemo) - no external state library
- **Data**: Menu items defined in `constants.ts` with categories and pricing
- **Types**: TypeScript interfaces in `types.ts` for MenuItem and CartItem

## Key Features

- Shopping cart functionality with add/remove/quantity management
- Category-based menu filtering (Pizza, Hot-Dog, Sandwich, etc.)
- Checkout modal with phone number collection
- Backend integration placeholder for Telegram bot orders (commented out in `App.tsx:94-105`)

## File Structure

- `index.tsx` - App entry point
- `App.tsx` - Main application component with all business logic
- `types.ts` - TypeScript interface definitions
- `constants.ts` - Menu data and categories
- `components/` - React components (Header, Cart, MenuList, etc.)

## Environment Setup

- Requires Node.js
- Uses Vite dev server on port 4000 with host 0.0.0.0
- Configured for GEMINI_API_KEY environment variable (via .env.local)
- Path alias `@/*` points to project root

## Backend Integration

Order submission logic exists but is commented out (`App.tsx:94-105`). When implementing backend:
- POST to `/api/send-order-to-telegram`
- Send order details with phone, items, totalPrice
- Server should forward to Telegram bot for admin notification
