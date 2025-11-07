import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Code2, Search, Lock } from "lucide-react";

const Index = () => {
  const topics = [
    {
      id: "sorting",
      title: "Sorting Algorithms",
      description: "Visualize bubble sort, merge sort, quick sort, and more with step-by-step animations.",
      icon: Code2,
      available: true,
      link: "/sorting",
      color: "text-primary",
    },
    {
      id: "searching",
      title: "Searching Algorithms",
      description: "Learn binary search, linear search, and advanced searching techniques.",
      icon: Search,
      available: false,
      link: "#",
      color: "text-accent",
    },
  ];

  const comingSoon = [
    { title: "Array Operations", description: "Master array manipulations, rotations, and advanced array problems." },
    { title: "Linked Lists", description: "Explore singly, doubly, and circular linked lists with visual operations." },
    { title: "Tree Structures", description: "Binary trees, BST, AVL trees, and tree traversal algorithms." },
    { title: "Graph Algorithms", description: "BFS, DFS, shortest paths, and graph theory fundamentals." },
    { title: "Dynamic Programming", description: "Visualize DP patterns, memoization, and optimization problems." },
    { title: "Hash Tables", description: "Hash functions, collision resolution, and hash table operations." },
    { title: "Pathfinding", description: "A*, Dijkstra, and other pathfinding algorithms with grid visualization." },
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 animate-fade-in">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            🧩 DSA Visualizer Platform
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Master Data Structures and Algorithms through interactive visualizations, step-by-step animations, 
            and synchronized code highlighting.
          </p>
        </div>
      </section>

      {/* Beginner Topics Section */}
      <section className="container mx-auto px-4 py-12 animate-slide-up" style={{ animationDelay: "0.2s" }}>
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">🟢 Beginner Topics</h2>
          <p className="text-muted-foreground">Start your DSA journey with these foundational algorithms</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {topics.map((topic) => {
            const Icon = topic.icon;
            const content = (
              <Card className="h-full shadow-card hover:shadow-hover transition-all duration-300 hover:-translate-y-1 bg-card">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-3 rounded-lg bg-gradient-primary`}>
                        <Icon className="h-6 w-6 text-primary-foreground" />
                      </div>
                      <CardTitle className="text-2xl">{topic.title}</CardTitle>
                    </div>
                    {topic.available ? (
                      <ArrowRight className="h-5 w-5 text-primary" />
                    ) : (
                      <Lock className="h-5 w-5 text-muted-foreground" />
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {topic.description}
                  </CardDescription>
                  {topic.available && (
                    <Button className="mt-4 w-full" size="lg">
                      Start Learning
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  )}
                  {!topic.available && (
                    <Button className="mt-4 w-full" variant="secondary" size="lg" disabled>
                      Coming Soon
                    </Button>
                  )}
                </CardContent>
              </Card>
            );

            return topic.available ? (
              <Link key={topic.id} to={topic.link} className="block">
                {content}
              </Link>
            ) : (
              <div key={topic.id}>{content}</div>
            );
          })}
        </div>

        {/* Coming Soon Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">🔵 Coming Soon Modules</h2>
          <p className="text-muted-foreground">More exciting topics are on the way!</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {comingSoon.map((module, idx) => (
            <Card key={idx} className="shadow-card bg-card/50 backdrop-blur-sm border-2 border-dashed">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Lock className="h-4 w-4 text-muted-foreground" />
                  {module.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{module.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 text-center text-muted-foreground border-t">
        <p>Built for algorithm enthusiasts</p>
      </footer>
    </div>
  );
};

export default Index;
