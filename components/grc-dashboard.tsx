"use client"

import { useState } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Text, Box } from "@react-three/drei"
import ReactFlow, { Background, Controls, MiniMap } from "reactflow"
import "reactflow/dist/style.css"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { AlertCircle, CheckCircle2, XCircle } from "lucide-react"

// 3D Risk Visualization Component
function RiskVisualization() {
  return (
    <Canvas camera={{ position: [0, 0, 10] }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Box args={[1, 1, 1]} position={[-2, 0, 0]}>
        <meshStandardMaterial color="red" />
      </Box>
      <Box args={[1, 2, 1]} position={[0, 0, 0]}>
        <meshStandardMaterial color="yellow" />
      </Box>
      <Box args={[1, 3, 1]} position={[2, 0, 0]}>
        <meshStandardMaterial color="green" />
      </Box>
      <Text position={[0, -2, 0]} fontSize={0.5} color="white">
        Risk Levels
      </Text>
      <OrbitControls />
    </Canvas>
  )
}

// Process Flow Component
const initialNodes = [
  { id: "1", position: { x: 0, y: 0 }, data: { label: "Risk Identification" } },
  { id: "2", position: { x: 0, y: 100 }, data: { label: "Risk Assessment" } },
  { id: "3", position: { x: 0, y: 200 }, data: { label: "Risk Mitigation" } },
  { id: "4", position: { x: 0, y: 300 }, data: { label: "Risk Monitoring" } },
]

const initialEdges = [
  { id: "e1-2", source: "1", target: "2" },
  { id: "e2-3", source: "2", target: "3" },
  { id: "e3-4", source: "3", target: "4" },
  { id: "e4-1", source: "4", target: "1", type: "step", animated: true },
]

function ProcessFlow() {
  return (
    <ReactFlow
      nodes={initialNodes}
      edges={initialEdges}
      fitView
    >
      <Background />
      <Controls />
      <MiniMap />
    </ReactFlow>
  )
}

// Main Dashboard Component
export function GrcDashboard() {
  const [complianceScore, setComplianceScore] = useState(75)

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">GRC Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Risk Visualization</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <RiskVisualization />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>GRC Process Flow</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ProcessFlow />
          </CardContent>
        </Card>
      </div>
      <div className="mt-6">
        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="risks">Risks</TabsTrigger>
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            <Card>
              <CardHeader>
                <CardTitle>GRC Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="text-yellow-500" />
                    <span>5 Open Risks</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="text-green-500" />
                    <span>10 Completed Audits</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <XCircle className="text-red-500" />
                    <span>2 Policy Violations</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="risks">
            <Card>
              <CardHeader>
                <CardTitle>Top Risks</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>Data Breach</li>
                  <li>Regulatory Non-Compliance</li>
                  <li>Operational Disruption</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="compliance">
            <Card>
              <CardHeader>
                <CardTitle>Compliance Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Progress value={complianceScore} className="w-full" />
                  <p>Current Compliance Score: {complianceScore}%</p>
                  <Button onClick={() => setComplianceScore(Math.min(100, complianceScore + 5))}>
                    Improve Compliance
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}