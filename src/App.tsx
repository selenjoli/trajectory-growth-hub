import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import Kanikuly from "./pages/Kanikuly.tsx";
import ChinaTour from "./pages/ChinaTour.tsx";
import SeaCamp from "./pages/SeaCamp.tsx";
import AltaiCamp from "./pages/AltaiCamp.tsx";
import UaeTour from "./pages/UaeTour.tsx";
import HilderstoneCourse from "./pages/HilderstoneCourse.tsx";
import Uchitelya from "./pages/Uchitelya.tsx";
import TeachersCourse from "./pages/TeachersCourse.tsx";
import ProSkillFest from "./pages/ProSkillFest.tsx";
import Partnership from "./pages/Partnership.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/kanikuly" element={<Kanikuly />} />
          <Route path="/kanikuly/china" element={<ChinaTour />} />
          <Route path="/kanikuly/more" element={<SeaCamp />} />
          <Route path="/kanikuly/altai" element={<AltaiCamp />} />
          <Route path="/kanikuly/uae" element={<UaeTour />} />
          <Route path="/kanikuly/online" element={<HilderstoneCourse />} />
          <Route path="/kanikuly/:program" element={<Index />} />
          <Route path="/uchitelya" element={<Uchitelya />} />
          <Route path="/uchitelya/kurs" element={<TeachersCourse />} />
          <Route path="/uchitelya/fest" element={<ProSkillFest />} />
          <Route path="/uchitelya/:course" element={<Index />} />
          <Route path="/partnerstvo" element={<Partnership />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
