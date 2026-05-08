import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home as HomeIcon, 
  BookOpen, 
  Users, 
  ClipboardCheck, 
  MapPin, 
  HelpCircle,
  Menu,
  X,
  ChevronRight,
  ChevronLeft,
  Dice5,
  RefreshCw,
  Trophy
} from 'lucide-react';
import { Page, Character, Task, Building, QAItem } from './types';
import { RULES, CHARACTERS, TASKS, BUILDINGS, QA_BANK } from './data';
import { cn } from './lib/utils';
import ReactMarkdown from 'react-markdown';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: '首頁', id: 'home', icon: HomeIcon },
    { name: '規則介紹', id: 'rules', icon: BookOpen },
    { name: '人物圖鑑', id: 'characters', icon: Users },
    { name: '任務抽卡', id: 'tasks', icon: ClipboardCheck },
    { name: '問答題庫', id: 'qa', icon: HelpCircle },
    { name: '建築景點', id: 'buildings', icon: MapPin },
  ];

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <HomeView onNavigate={(p) => setCurrentPage(p)} />;
      case 'rules': return <RulesView />;
      case 'characters': return <CharactersView />;
      case 'tasks': return <TasksView />;
      case 'buildings': return <BuildingsView />;
      case 'qa': return <QAView />;
      default: return <HomeView onNavigate={(p) => setCurrentPage(p)} />;
    }
  };

  return (
    <div className="min-h-screen bg-board-bg text-slate-100 font-sans selection:bg-board-accent-blue/30">
      {/* Mobile Navigation */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-board-bg/80 backdrop-blur-md border-b border-board-border px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentPage('home')}>
          <img src="/pictures/pic/logo.png" alt="Logo" className="h-12 object-contain brightness-0 invert" referrerPolicy="no-referrer" />
        </div>
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-board-text-muted">
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="lg:hidden fixed inset-0 z-40 bg-board-bg pt-16 px-4"
          >
            <nav className="flex flex-col py-6 gap-3">
              {navigation.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentPage(item.id as Page);
                    setIsMenuOpen(false);
                  }}
                  className={cn(
                    "flex items-center gap-4 p-4 rounded-2xl text-lg font-medium transition-all",
                    currentPage === item.id ? "bg-board-accent-blue text-white shadow-lg shadow-board-accent-blue/20" : "text-board-text-muted hover:bg-board-card"
                  )}
                >
                  <item.icon size={24} />
                  {item.name}
                </button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex fixed top-0 left-0 bottom-0 w-64 bg-board-card border-r border-board-border flex-col py-8 z-30">
        <div className="px-6 mb-10 flex items-center gap-3 cursor-pointer" onClick={() => setCurrentPage('home')}>
          <img src="/pictures/pic/logo.png" alt="Logo" className="h-16 object-contain brightness-0 invert" referrerPolicy="no-referrer" />
        </div>
        <nav className="flex-1 px-4 space-y-3">
          {navigation.map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id as Page)}
              id={`nav-item-${item.id}`}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-bold transition-all duration-200 border border-transparent",
                currentPage === item.id 
                  ? "bg-board-accent-blue/10 text-board-accent-blue border-board-accent-blue/30 shadow-xl" 
                  : "text-board-text-muted hover:bg-board-bg hover:text-white"
              )}
            >
              <item.icon size={20} />
              {item.name}
            </button>
          ))}
        </nav>
        <div className="px-6 mt-auto">
          <div className="p-4 bg-board-bg rounded-2xl border border-board-border">
            <p className="text-[10px] font-black text-board-text-muted mb-1 leading-relaxed uppercase tracking-widest">System Status</p>
            <p className="text-sm font-medium text-slate-400">v1.2.0 - Stabilized</p>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="lg:ml-64 pt-20 lg:pt-0 p-6 lg:p-12 max-w-6xl mx-auto min-h-screen" v-id="main-content-layout">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.3 }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

function HomeView({ onNavigate }: { onNavigate: (p: Page) => void }) {
  const cards = [
    { title: '人物圖鑑', desc: '瀏覽冒險角色，開啟不同技能。', page: 'characters', icon: Users, color: 'text-board-accent-blue bg-board-accent-blue/10' },
    { title: '任務發布', desc: '查看最新委託，完成目標獲取獎勵。', page: 'tasks', icon: ClipboardCheck, color: 'text-emerald-400 bg-emerald-500/10' },
    { title: '地圖導覽', desc: '了解各大場景與建築的特殊效果。', page: 'buildings', icon: MapPin, color: 'text-board-accent-red bg-board-accent-red/10' },
    { title: '百科全書', desc: '遇上爭議？查閱規則與導引說明。', page: 'rules', icon: BookOpen, color: 'text-amber-400 bg-amber-500/10' },
  ];

  return (
    <div className="space-y-12">
      <header className="space-y-6 max-w-2xl" v-id="home-header">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-board-card border border-board-border text-board-accent-blue text-sm font-bold"
        >
          <Trophy size={14} className="text-board-accent-red" />
          <span>全新視覺風格更新</span>
        </motion.div>
        <h1 className="text-4xl lg:text-7xl font-black tracking-tight text-white leading-[1.1]">
          啟航冒險<br /><span className="text-board-accent-blue">桌遊指揮部</span>
        </h1>
        <p className="text-xl text-board-text-muted leading-relaxed font-medium">
          專為精英玩家打造，集結戰術、情報與命運於一體的極致工具箱。
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6" v-id="home-nav-grid">
        {cards.map((card, idx) => (
          <motion.button
            key={card.title}
            id={`home-card-${idx}`}
            whileHover={{ y: -4, backgroundColor: 'rgba(62, 63, 72, 0.4)' }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onNavigate(card.page as Page)}
            className="flex items-start gap-6 p-8 bg-board-card rounded-[2.5rem] border border-board-border shadow-sm transition-all text-left"
          >
            <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 shadow-lg", card.color)}>
              <card.icon size={32} />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-white">{card.title}</h3>
              <p className="text-board-text-muted leading-relaxed">{card.desc}</p>
              <div className="flex items-center gap-1 text-sm font-bold pt-3 text-board-accent-blue">
                啟動協議 <ChevronRight size={16} />
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

function RulesView() {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4" v-id="rules-page-header">
        <div className="w-12 h-12 bg-board-accent-blue rounded-xl flex items-center justify-center text-white shadow-lg shadow-board-accent-blue/30">
          <BookOpen size={24} />
        </div>
        <h2 className="text-3xl font-bold text-white">規則傳遞</h2>
      </div>

      <div className="grid grid-cols-1 gap-6" v-id="rules-list">
        {RULES.map((rule, idx) => (
          <motion.div 
            key={idx}
            id={`rule-item-${idx}`}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 bg-board-card rounded-3xl border border-board-border shadow-md"
          >
            <h3 className="text-xl font-bold mb-4 text-board-accent-red flex items-center gap-3">
              <div className="w-1.5 h-6 bg-board-accent-red rounded-full" />
              {rule.title}
            </h3>
            <div className="prose prose-invert max-w-none prose-p:leading-relaxed prose-p:text-slate-300">
              <ReactMarkdown>{rule.content}</ReactMarkdown>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function FlipCard({ id, name }: { id: string; name: string }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="group perspective-1000 w-48 h-72 md:w-64 md:h-96 shrink-0 cursor-pointer" id={`flip-card-${id}`} onClick={() => setIsFlipped(!isFlipped)}>
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
        className="relative w-full h-full preserve-3d"
      >
        {/* Front Side (A) */}
        <div className="absolute inset-0 backface-hidden rounded-2xl overflow-hidden shadow-xl border border-board-border bg-board-card">
          <img 
            src={`/pictures/front/C_${id}A.png`} 
            alt={`${name} Front`} 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
            onError={(e) => {
              (e.target as HTMLImageElement).src = `https://placehold.co/400x600/35363e/white?text=${name}+Front`;
            }}
          />
        </div>

        {/* Back Side (B) */}
        <div 
          className="absolute inset-0 backface-hidden rounded-2xl overflow-hidden shadow-xl border border-board-accent-blue/50 bg-board-card rotate-y-180"
        >
          <img 
            src={`/pictures/back/C_${id}B.png`} 
            alt={`${name} Back`} 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
            onError={(e) => {
              (e.target as HTMLImageElement).src = `https://placehold.co/400x600/35363e/white?text=${name}+Back`;
            }}
          />
        </div>
      </motion.div>
    </div>
  );
}

function CharacterGallery() {
  const [activeIndex, setActiveIndex] = useState(0);
  const total = CHARACTERS.length;

  const rotate = (direction: 'left' | 'right') => {
    if (direction === 'left') {
      setActiveIndex((prev) => (prev - 1 + total) % total);
    } else {
      setActiveIndex((prev) => (prev + 1) % total);
    }
  };

  return (
    <section className="space-y-8 animate-in fade-in duration-500 relative group" v-id="character-gallery-section">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-board-accent-blue rounded-xl flex items-center justify-center text-white shadow-lg shadow-board-accent-blue/30">
            <Users size={24} />
          </div>
          <div className="space-y-1">
            <h2 className="text-3xl font-black text-white uppercase tracking-tight">人物圖鑑</h2>
            <p className="text-board-text-muted text-sm">環狀目錄瀏覽，點擊中間卡片解鎖技能戰術</p>
          </div>
        </div>
      </div>

      {/* 3D Carousel Stage */}
      <div className="relative h-[400px] md:h-[500px] w-full flex items-center justify-center perspective-1000 overflow-hidden">
        <div className="relative w-48 h-72 md:w-64 md:h-96 preserve-3d">
          {CHARACTERS.map((char, index) => {
            // Calculate relative position in the circle
            let offset = index - activeIndex;
            
            // Handle wrapping for infinite loop look
            if (offset > total / 2) offset -= total;
            if (offset < -total / 2) offset += total;

            const absOffset = Math.abs(offset);
            const isActive = index === activeIndex;

            // 3D positioning logic
            const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
            const spread = isMobile ? 120 : 220;
            const depth = isMobile ? -150 : -200;

            const rotateY = offset * (isMobile ? 35 : 45); 
            const translateZ = absOffset * depth; 
            const translateX = offset * spread; 
            const opacity = Math.max(0.1, 1 - absOffset * 0.4);
            const zIndex = 10 - absOffset;

            return (
              <motion.div
                key={char.id}
                initial={false}
                animate={{
                  rotateY,
                  x: translateX,
                  z: translateZ,
                  opacity,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30
                }}
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  zIndex,
                  pointerEvents: isActive ? 'auto' : 'none', // Only middle card is clickable for flip
                }}
              >
                <div className={cn(
                  "transition-all duration-500",
                  isActive ? "scale-110" : "scale-90 brightness-50"
                )}>
                  <FlipCard id={char.id} name={char.name} />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Large Floating Tactical Navigation Arrows */}
        <button 
          onClick={() => rotate('left')}
          className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-30 w-16 h-16 flex items-center justify-center bg-board-card/40 backdrop-blur-xl border border-white/10 text-board-accent-blue rounded-2xl shadow-2xl transition-all hover:bg-board-accent-blue hover:text-white hover:scale-110 active:scale-95 group/arrow"
          id="gallery-float-left"
        >
          <div className="absolute inset-0 bg-board-accent-blue/20 blur-xl opacity-0 group-hover/arrow:opacity-100 transition-opacity" />
          <ChevronLeft size={32} strokeWidth={3} className="relative z-10" />
        </button>
        <button 
          onClick={() => rotate('right')}
          className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-30 w-16 h-16 flex items-center justify-center bg-board-card/40 backdrop-blur-xl border border-white/10 text-board-accent-blue rounded-2xl shadow-2xl transition-all hover:bg-board-accent-blue hover:text-white hover:scale-110 active:scale-95 group/arrow"
          id="gallery-float-right"
        >
          <div className="absolute inset-0 bg-board-accent-blue/20 blur-xl opacity-0 group-hover/arrow:opacity-100 transition-opacity" />
          <ChevronRight size={32} strokeWidth={3} className="relative z-10" />
        </button>
      </div>
    </section>
  );
}

function CharactersView() {
  return (
    <div className="pb-20">
      <CharacterGallery />
    </div>
  );
}


function TasksView() {
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const drawTask = () => {
    setIsDrawing(true);
    setActiveTask(null);
    setTimeout(() => {
      const random = TASKS[Math.floor(Math.random() * TASKS.length)];
      setActiveTask(random);
      setIsDrawing(false);
    }, 600);
  };

  const difficultyStyles = {
    easy: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
    medium: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
    hard: 'text-board-accent-red bg-board-accent-red/10 border-board-accent-red/30',
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-900/50">
            <ClipboardCheck size={24} />
          </div>
          <h2 className="text-3xl font-bold text-white">任務傳遞中心</h2>
        </div>
        <button 
          onClick={drawTask}
          disabled={isDrawing}
          className="bg-board-card border border-board-border text-emerald-400 px-8 py-4 rounded-2xl font-bold hover:bg-slate-700 transition-all flex items-center gap-3 disabled:opacity-50"
        >
          {isDrawing ? <RefreshCw className="animate-spin" /> : <ClipboardCheck size={20} />}
          {isDrawing ? "同步中..." : "接收新訊令"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         {TASKS.map(task => (
           <motion.div
             key={task.id}
             whileHover={{ y: -5 }}
             className={cn(
               "p-8 bg-board-card rounded-[2rem] border-2 transition-all relative",
               activeTask?.id === task.id ? "border-emerald-500 shadow-2xl shadow-emerald-500/20" : "border-board-border"
             )}
             onClick={() => setActiveTask(task)}
           >
              <div className={cn(
                "inline-flex px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border mb-4",
                difficultyStyles[task.difficulty]
              )}>
                {task.difficulty}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{task.title}</h3>
              <p className="text-board-text-muted text-sm leading-relaxed mb-6">{task.description}</p>
              <div className="flex items-center justify-between pt-4 border-t border-board-border">
                <span className="text-[10px] font-bold text-board-text-muted uppercase">Intelligence Reward</span>
                <span className="text-emerald-400 font-black">{task.reward}</span>
              </div>
           </motion.div>
         ))}
      </div>
    </div>
  );
}

function BuildingsView() {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-board-accent-red rounded-xl flex items-center justify-center text-white shadow-lg shadow-board-accent-red/30">
          <MapPin size={24} />
        </div>
        <h2 className="text-3xl font-bold text-white">戰區情報 (建築景點)</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {BUILDINGS.map((building) => (
          <div
            key={building.id}
            className="group bg-board-card rounded-[2.5rem] border border-board-border overflow-hidden hover:border-board-accent-red/30 transition-all flex flex-col"
          >
            <div className="h-40 bg-board-bg flex items-center justify-center relative">
              <MapPin size={48} className="text-board-accent-red/20 group-hover:text-board-accent-red group-hover:scale-110 transition-all duration-500" />
              <div className="absolute top-4 right-4 bg-board-card/80 px-3 py-1 rounded-lg text-[10px] font-bold text-board-text-muted">
                Loc: {building.location}
              </div>
            </div>
            <div className="p-8 space-y-6 flex-1 flex flex-col">
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-white">{building.name}</h3>
                <p className="text-board-text-muted text-sm leading-relaxed line-clamp-2">{building.description}</p>
              </div>
              <div className="mt-auto pt-6 border-t border-board-border">
                 <div className="flex items-center gap-4">
                   <div className="w-10 h-10 bg-board-accent-red/10 rounded-xl flex items-center justify-center text-board-accent-red">
                     <RefreshCw size={20} />
                   </div>
                   <div>
                     <p className="text-[10px] font-black text-board-accent-red uppercase tracking-widest leading-none mb-1">Environmental Effect</p>
                     <p className="text-slate-200 font-bold">{building.effect}</p>
                   </div>
                 </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function QAView() {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-board-accent-blue rounded-xl flex items-center justify-center text-white shadow-lg">
          <HelpCircle size={24} />
        </div>
        <h2 className="text-3xl font-bold text-white">操作手冊 (Q&A)</h2>
      </div>

      <div className="grid grid-cols-1 gap-4 max-w-4xl">
        {QA_BANK.map((qa) => (
          <div 
            key={qa.id}
            className={cn(
              "rounded-2xl border transition-all duration-300",
              activeId === qa.id ? "bg-board-card border-board-accent-blue" : "bg-board-card/50 border-board-border"
            )}
          >
            <button
              onClick={() => setActiveId(activeId === qa.id ? null : qa.id)}
              className="w-full flex items-center justify-between p-7 text-left group"
            >
              <div className="space-y-2">
                <span className="text-[9px] font-black text-board-accent-blue bg-board-accent-blue/10 px-2 py-0.5 rounded tracking-tighter uppercase">{qa.category}</span>
                <h3 className="text-xl font-bold text-white group-hover:text-board-accent-blue transition-colors">{qa.question}</h3>
              </div>
              <motion.div animate={{ rotate: activeId === qa.id ? 180 : 0 }}>
                <ChevronRight size={24} className={cn("transition-colors", activeId === qa.id ? "text-board-accent-blue" : "text-board-text-muted")} />
              </motion.div>
            </button>
            <AnimatePresence>
              {activeId === qa.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="px-7 pb-7 text-board-text-muted leading-relaxed text-lg border-t border-board-border pt-4">
                    <div className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-board-accent-blue/10 flex items-center justify-center text-board-accent-blue shrink-0 font-black text-sm">A</div>
                      <p>{qa.answer}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}
