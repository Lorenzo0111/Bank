/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'

// Create Virtual Routes

const FriendsLazyImport = createFileRoute('/friends')()
const IndexLazyImport = createFileRoute('/')()
const AuthRegisterLazyImport = createFileRoute('/auth/register')()
const AuthLogoutLazyImport = createFileRoute('/auth/logout')()
const AuthLoginLazyImport = createFileRoute('/auth/login')()

// Create/Update Routes

const FriendsLazyRoute = FriendsLazyImport.update({
  path: '/friends',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/friends.lazy').then((d) => d.Route))

const IndexLazyRoute = IndexLazyImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route))

const AuthRegisterLazyRoute = AuthRegisterLazyImport.update({
  path: '/auth/register',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/auth/register.lazy').then((d) => d.Route))

const AuthLogoutLazyRoute = AuthLogoutLazyImport.update({
  path: '/auth/logout',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/auth/logout.lazy').then((d) => d.Route))

const AuthLoginLazyRoute = AuthLoginLazyImport.update({
  path: '/auth/login',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/auth/login.lazy').then((d) => d.Route))

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/friends': {
      id: '/friends'
      path: '/friends'
      fullPath: '/friends'
      preLoaderRoute: typeof FriendsLazyImport
      parentRoute: typeof rootRoute
    }
    '/auth/login': {
      id: '/auth/login'
      path: '/auth/login'
      fullPath: '/auth/login'
      preLoaderRoute: typeof AuthLoginLazyImport
      parentRoute: typeof rootRoute
    }
    '/auth/logout': {
      id: '/auth/logout'
      path: '/auth/logout'
      fullPath: '/auth/logout'
      preLoaderRoute: typeof AuthLogoutLazyImport
      parentRoute: typeof rootRoute
    }
    '/auth/register': {
      id: '/auth/register'
      path: '/auth/register'
      fullPath: '/auth/register'
      preLoaderRoute: typeof AuthRegisterLazyImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  IndexLazyRoute,
  FriendsLazyRoute,
  AuthLoginLazyRoute,
  AuthLogoutLazyRoute,
  AuthRegisterLazyRoute,
})

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/friends",
        "/auth/login",
        "/auth/logout",
        "/auth/register"
      ]
    },
    "/": {
      "filePath": "index.lazy.tsx"
    },
    "/friends": {
      "filePath": "friends.lazy.tsx"
    },
    "/auth/login": {
      "filePath": "auth/login.lazy.tsx"
    },
    "/auth/logout": {
      "filePath": "auth/logout.lazy.tsx"
    },
    "/auth/register": {
      "filePath": "auth/register.lazy.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
