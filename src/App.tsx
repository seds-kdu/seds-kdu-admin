import {
  Refine,
  Authenticated,
  ErrorComponent,
} from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import { BrowserRouter, Route, Routes, Outlet } from "react-router";
import routerProvider, {
  NavigateToResource,
  CatchAllNavigate,
  UnsavedChangesNotifier,
  DocumentTitleHandler,
} from "@refinedev/react-router";
import { liveProvider } from "@refinedev/supabase";
import { Layout } from "./components/layout";
import { ErrorBoundary } from "./components/error-boundary";
import "./App.css";
import { supabaseClient } from "./providers/supabase-client";
import { dataProvider } from "./providers/data";
import authProvider from "./providers/auth";

// Pages
import { EventsList, EventsCreate, EventsEdit, EventsShow } from "./pages/events";
import { TeamMembersList, TeamMembersCreate, TeamMembersEdit, TeamMembersShow } from "./pages/team_members";
import { NewsList, NewsCreate, NewsEdit, NewsShow } from "./pages/news";
import { LeadsList, LeadsCreate, LeadsEdit, LeadsShow } from "./pages/leads";
import { GalleryList, GalleryCreate, GalleryEdit, GalleryShow } from "./pages/gallery";
import { ProjectsList, ProjectsCreate, ProjectsEdit, ProjectsShow } from "./pages/projects";
import { ProfilesList, ProfilesCreate, ProfilesEdit, ProfilesShow } from "./pages/profiles";
import { DivisionsList, DivisionsCreate, DivisionsEdit, DivisionsShow } from "./pages/divisions";
import { CoreValuesList, CoreValuesCreate, CoreValuesEdit, CoreValuesShow } from "./pages/core_values";
import { AboutContentEdit } from "./pages/about_content";
import { TimelineEventsList, TimelineEventsCreate, TimelineEventsEdit, TimelineEventsShow } from "./pages/timeline_events";
import { LoginPage } from "./pages/auth/login";

function App() {
  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <DevtoolsProvider>
          <Refine
            dataProvider={dataProvider}
            liveProvider={liveProvider(supabaseClient)}
            authProvider={authProvider}
            routerProvider={routerProvider}
            options={{
              syncWithLocation: true,
              warnWhenUnsavedChanges: true,
              projectId: "FhvZQT-DHHTo8-S0qwSJ",
            }}
            resources={[
              { name: "events", list: "/events", create: "/events/create", edit: "/events/edit/:id", show: "/events/show/:id", meta: { label: "Events" } },
              { name: "team_members", list: "/team_members", create: "/team_members/create", edit: "/team_members/edit/:id", show: "/team_members/show/:id", meta: { label: "Team Members" } },
              { name: "news", list: "/news", create: "/news/create", edit: "/news/edit/:id", show: "/news/show/:id", meta: { label: "News" } },
              { name: "leads", list: "/leads", create: "/leads/create", edit: "/leads/edit/:id", show: "/leads/show/:id", meta: { label: "Leads" } },
              { name: "gallery", list: "/gallery", create: "/gallery/create", edit: "/gallery/edit/:id", show: "/gallery/show/:id", meta: { label: "Gallery" } },
              { name: "projects", list: "/projects", create: "/projects/create", edit: "/projects/edit/:id", show: "/projects/show/:id", meta: { label: "Projects" } },
              { name: "profiles", list: "/profiles", create: "/profiles/create", edit: "/profiles/edit/:id", show: "/profiles/show/:id", meta: { label: "Profiles" } },
              { name: "divisions", list: "/divisions", create: "/divisions/create", edit: "/divisions/edit/:id", show: "/divisions/show/:id", meta: { label: "Divisions" } },
              { name: "core_values", list: "/core_values", create: "/core_values/create", edit: "/core_values/edit/:id", show: "/core_values/show/:id", meta: { label: "Core Values" } },
              { name: "about_content", list: "/about_content", create: "/about_content/create", edit: "/about_content/edit/:id", show: "/about_content/show/:id", meta: { label: "About Content" } },
              { name: "timeline_events", list: "/timeline_events", create: "/timeline_events/create", edit: "/timeline_events/edit/:id", show: "/timeline_events/show/:id", meta: { label: "Timeline Events" } },
            ]}
          >
            <Routes>
              <Route
                element={
                  <Authenticated key="auth-layout" fallback={<CatchAllNavigate to="/login" />}>
                    <Layout>
                      <ErrorBoundary>
                        <Outlet />
                      </ErrorBoundary>
                    </Layout>
                  </Authenticated>
                }
              >
                <Route index element={<NavigateToResource resource="events" />} />

                <Route path="/events"><Route index element={<EventsList />} /><Route path="create" element={<EventsCreate />} /><Route path="edit/:id" element={<EventsEdit />} /><Route path="show/:id" element={<EventsShow />} /></Route>
                <Route path="/team_members"><Route index element={<TeamMembersList />} /><Route path="create" element={<TeamMembersCreate />} /><Route path="edit/:id" element={<TeamMembersEdit />} /><Route path="show/:id" element={<TeamMembersShow />} /></Route>
                <Route path="/news"><Route index element={<NewsList />} /><Route path="create" element={<NewsCreate />} /><Route path="edit/:id" element={<NewsEdit />} /><Route path="show/:id" element={<NewsShow />} /></Route>
                <Route path="/leads"><Route index element={<LeadsList />} /><Route path="create" element={<LeadsCreate />} /><Route path="edit/:id" element={<LeadsEdit />} /><Route path="show/:id" element={<LeadsShow />} /></Route>
                <Route path="/gallery"><Route index element={<GalleryList />} /><Route path="create" element={<GalleryCreate />} /><Route path="edit/:id" element={<GalleryEdit />} /><Route path="show/:id" element={<GalleryShow />} /></Route>
                <Route path="/projects"><Route index element={<ProjectsList />} /><Route path="create" element={<ProjectsCreate />} /><Route path="edit/:id" element={<ProjectsEdit />} /><Route path="show/:id" element={<ProjectsShow />} /></Route>
                <Route path="/profiles"><Route index element={<ProfilesList />} /><Route path="create" element={<ProfilesCreate />} /><Route path="edit/:id" element={<ProfilesEdit />} /><Route path="show/:id" element={<ProfilesShow />} /></Route>
                <Route path="/divisions"><Route index element={<DivisionsList />} /><Route path="create" element={<DivisionsCreate />} /><Route path="edit/:id" element={<DivisionsEdit />} /><Route path="show/:id" element={<DivisionsShow />} /></Route>
                <Route path="/core_values"><Route index element={<CoreValuesList />} /><Route path="create" element={<CoreValuesCreate />} /><Route path="edit/:id" element={<CoreValuesEdit />} /><Route path="show/:id" element={<CoreValuesShow />} /></Route>
                <Route path="/about_content"><Route index element={<AboutContentEdit />} /><Route path="create" element={<AboutContentEdit />} /><Route path="edit/:id" element={<AboutContentEdit />} /><Route path="show/:id" element={<AboutContentEdit />} /></Route>
                <Route path="/timeline_events"><Route index element={<TimelineEventsList />} /><Route path="create" element={<TimelineEventsCreate />} /><Route path="edit/:id" element={<TimelineEventsEdit />} /><Route path="show/:id" element={<TimelineEventsShow />} /></Route>

                <Route path="*" element={<ErrorComponent />} />
              </Route>

              <Route
                element={
                  <Authenticated key="auth-pages" fallback={<Outlet />}>
                    <NavigateToResource resource="events" />
                  </Authenticated>
                }
              >
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<LoginPage />} />
                <Route path="/forgot-password" element={<LoginPage />} />
              </Route>
            </Routes>

            <RefineKbar />
            <UnsavedChangesNotifier />
            <DocumentTitleHandler />
          </Refine>
          <DevtoolsPanel />
        </DevtoolsProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
