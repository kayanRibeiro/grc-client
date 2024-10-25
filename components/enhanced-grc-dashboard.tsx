"use client"

import { useState, useEffect, useRef } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Text, Box } from "@react-three/drei"
import ReactFlow, { Background, Controls, MiniMap } from "reactflow"
import "reactflow/dist/style.css"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AlertCircle, CheckCircle2, XCircle, BarChart3, PieChart } from "lucide-react"
import * as d3 from "d3"

// Mock data
const mockRisks = [
  { id: 1, name: "Data Breach", probability: 0.7, impact: 0.9, category: "Information Security" },
  { id: 2, name: "Regulatory Non-Compliance", probability: 0.5, impact: 0.8, category: "Compliance" },
  { id: 3, name: "Operational Disruption", probability: 0.6, impact: 0.7, category: "Operations" },
  { id: 4, name: "Financial Misstatement", probability: 0.3, impact: 0.9, category: "Financial" },
  { id: 5, name: "Vendor Risk", probability: 0.4, impact: 0.6, category: "Third Party" },
]

const mockComplianceData = [
  { regulation: "GDPR", score: 85 },
  { regulation: "SOX", score: 92 },
  { regulation: "PCI DSS", score: 78 },
  { regulation: "HIPAA", score: 88 },
]

const mockIncidents = [
  { id: 1, type: "Data Leak", severity: "High", status: "Open" },
  { id: 2, type: "Policy Violation", severity: "Medium", status: "Closed" },
  { id: 3, type: "System Outage", severity: "High", status: "In Progress" },
]

// 3D Risk Visualization Component
function RiskVisualization() {
  return (
    <Canvas camera={{ position: [0, 0, 10] }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      {mockRisks.map((risk, index) => (
        <Box 
          key={risk.id} 
          args={[1, risk.impact * 3, 1]} 
          position={[(index - 2) * 2, 0, 0]}
        >
          <meshStandardMaterial color={d3.interpolateReds(risk.probability)} />
        </Box>
      ))}
      <Text position={[0, -2, 0]} fontSize={0.5} color="white">
        Risk Levels (Height: Impact, Color: Probability)
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
  { id: "5", position: { x: 200, y: 150 }, data: { label: "Compliance Check" } },
]

const initialEdges = [
  { id: "e1-2", source: "1", target: "2" },
  { id: "e2-3", source: "2", target: "3" },
  { id: "e3-4", source: "3", target: "4" },
  { id: "e4-1", source: "4", target: "1", type: "step", animated: true },
  { id: "e2-5", source: "2", target: "5", type: "straight" },
  { id: "e5-3", source: "5", target: "3", type: "straight" },
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

// D3.js Risk Heatmap Component
function RiskHeatmap() {
  const svgRef = useRef(null)

  useEffect(() => {
    if (svgRef.current) {
      const svg = d3.select(svgRef.current)
      const width = 300
      const height = 200
      const margin = { top: 20, right: 20, bottom: 30, left: 40 }

      const x = d3.scaleLinear()
        .domain([0, 1])
        .range([margin.left, width - margin.right])

      const y = d3.scaleLinear()
        .domain([0, 1])
        .range([height - margin.bottom, margin.top])

      const color = d3.scaleSequential(d3.interpolateYlOrRd)
        .domain([0, 1])

      svg.selectAll("*").remove() // Clear previous render

      svg.selectAll("circle")
        .data(mockRisks)
        .enter()
        .append("circle")
        .attr("cx", d => x(d.probability))
        .attr("cy", d => y(d.impact))
        .attr("r", 8)
        .attr("fill", d => color(d.probability * d.impact))
        .append("title")
        .text(d => d.name)

      svg.append("g")
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x).ticks(5))
        .append("text")
        .attr("x", width - margin.right)
        .attr("y", -6)
        .attr("fill", "currentColor")
        .attr("text-anchor", "end")
        .text("Probability")

      svg.append("g")
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(y).ticks(5))
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .attr("fill", "currentColor")
        .attr("text-anchor", "end")
        .text("Impact")
    }
  }, [])

  return (
    <svg ref={svgRef} width="100%" height="200" />
  )
}

// D3.js Compliance Radar Chart Component
function ComplianceRadarChart() {
  const svgRef = useRef(null)

  useEffect(() => {
    if (svgRef.current) {
      const svg = d3.select(svgRef.current)
      const width = 300
      const height = 300
      const margin = 40

      const radialScale = d3.scaleLinear()
        .domain([0, 100])
        .range([0, width / 2 - margin])

      const angleScale = d3.scalePoint()
        .domain(mockComplianceData.map(d => d.regulation))
        .range([0, Math.PI * 2])

      svg.selectAll("*").remove() // Clear previous render

      const g = svg.append("g")
        .attr("transform", `translate(${width / 2},${height / 2})`)

      // Draw axis
      mockComplianceData.forEach(d => {
        const angle = angleScale(d.regulation)
        const line = g.append("line")
          .attr("x1", 0)
          .attr("y1", 0)
          .attr("x2", radialScale(100) * Math.cos(angle - Math.PI / 2))
          .attr("y2", radialScale(100) * Math.sin(angle - Math.PI / 2))
          .attr("stroke", "gray")
          .attr("stroke-width", 1)

        g.append("text")
          .attr("x", (radialScale(100) + 10) * Math.cos(angle - Math.PI / 2))
          .attr("y", (radialScale(100) + 10) * Math.sin(angle - Math.PI / 2))
          .attr("text-anchor", "middle")
          .attr("dominant-baseline", "middle")
          .text(d.regulation)
      })

      // Draw data points
      const line = d3.lineRadial()
        .angle(d => angleScale(d.regulation) - Math.PI / 2)
        .radius(d => radialScale(d.score))
        .curve(d3.curveLinearClosed)

      g.append("path")
        .datum(mockComplianceData)
        .attr("d", line)
        .attr("fill", "rgba(255, 99, 132, 0.2)")
        .attr("stroke", "rgb(255, 99, 132)")
        .attr("stroke-width", 2)

      mockComplianceData.forEach(d => {
        const angle = angleScale(d.regulation)
        g.append("circle")
          .attr("cx", radialScale(d.score) * Math.cos(angle - Math.PI / 2))
          .attr("cy", radialScale(d.score) * Math.sin(angle - Math.PI / 2))
          .attr("r", 4)
          .attr("fill", "rgb(255, 99, 132)")
      })
    }
  }, [])

  return (
    <svg ref={svgRef} width="100%" height="300" />
  )
}

// Main Dashboard Component
export function EnhancedGrcDashboard() {
  const [complianceScore, setComplianceScore] = useState(75)

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Enhanced GRC Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>3D Risk Visualization</CardTitle>
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
        <Card>
          <CardHeader>
            <CardTitle>Risk Heatmap</CardTitle>
          </CardHeader>
          <CardContent>
            <RiskHeatmap />
          </CardContent>
        </Card>
      </div>
      <div className="mt-6">
        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="risks">Risks</TabsTrigger>
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
            <TabsTrigger value="incidents">Incidents</TabsTrigger>
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
                    <span>{mockRisks.length} Identified Risks</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="text-green-500" />
                    <span>{mockComplianceData.length} Compliance Regulations</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <XCircle className="text-red-500" />
                    <span>{mockIncidents.filter(i => i.status === "Open").length} Open Incidents</span>
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
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Risk</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Probability</TableHead>
                      <TableHead>Impact</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockRisks.map((risk) => (
                      <TableRow key={risk.id}>
                        <TableCell>{risk.name}</TableCell>
                        <TableCell>{risk.category}</TableCell>
                        <TableCell>{risk.probability.toFixed(2)}</TableCell>
                        <TableCell>{risk.impact.toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="compliance">
            <Card>
              <CardHeader>
                <CardTitle>Compliance Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Compliance Scores</h3>
                    <ComplianceRadarChart />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Overall Compliance Score</h3>
                    <Progress value={complianceScore} className="w-full mb-2" />
                    <p className="mb-2">Current Compliance Score: {complianceScore}%</p>
                    <Button onClick={() => setComplianceScore(Math.min(100, complianceScore + 5))}>
                      Improve Compliance
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="incidents">
            <Card>
              <CardHeader>
                
                <CardTitle>Recent Incidents</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Type</TableHead>
                      <TableHead>Severity</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockIncidents.map((incident) => (
                      <TableRow key={incident.id}>
                        <TableCell>{incident.type}</TableCell>
                        <TableCell>{incident.severity}</TableCell>
                        <TableCell>{incident.status}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}