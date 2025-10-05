import { lazy } from 'react'

// Lazy loading для тяжелых компонентов
export const LazyThemeCustomizer = lazy(() => import('../components/molecules/ThemeCustomizer'))
export const LazyComponentGrid = lazy(() => import('../components/organisms/ComponentGrid'))
export const LazyInstallDialog = lazy(() => import('../components/molecules/InstallDialog'))

// Lazy loading для UI компонентов (по требованию)
export const LazyDialog = lazy(() => import('../components/ui/dialog'))
export const LazyTabs = lazy(() => import('../components/ui/tabs'))
export const LazyAccordion = lazy(() => import('../components/ui/accordion'))
export const LazyTable = lazy(() => import('../components/ui/table'))
export const LazyCalendar = lazy(() => import('../components/ui/calendar'))
export const LazyCommand = lazy(() => import('../components/ui/command'))
export const LazyForm = lazy(() => import('../components/ui/form'))
export const LazyNavigationMenu = lazy(() => import('../components/ui/navigation-menu'))
export const LazyMenubar = lazy(() => import('../components/ui/menubar'))
export const LazySheet = lazy(() => import('../components/ui/sheet'))
export const LazyResizable = lazy(() => import('../components/ui/resizable'))

// Динамический импорт для компонентов по категориям
export const loadFormComponents = () => import('../components/ui/form-components')
export const loadLayoutComponents = () => import('../components/ui/layout-components')
export const loadNavigationComponents = () => import('../components/ui/navigation-components')
export const loadOverlayComponents = () => import('../components/ui/overlay-components')
export const loadFeedbackComponents = () => import('../components/ui/feedback-components')
export const loadDisplayComponents = () => import('../components/ui/display-components')
