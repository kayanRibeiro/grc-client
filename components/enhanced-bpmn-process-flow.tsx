"use client"

import { useState, useCallback } from "react"
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  MarkerType,
} from "reactflow"
import "reactflow/dist/style.css"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { PlusCircle, Square, Circle, Diamond } from "lucide-react"

// BPMN node types
const TaskNode = ({ data }) => (
  <div className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-gray-400">
    <Square className="inline-block mr-2" size={20} />
    <span>{data.label}</span>
  </div>
)

const StartEventNode = ({ data }) => (
  <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white">
    <Circle size={30} />
  </div>
)

const EndEventNode = ({ data }) => (
  <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center text-white">
    <Circle size={30} />
  </div>
)

const GatewayNode = ({ data }) => (
  <div className="w-10 h-10 rotate-45 bg-yellow-500 flex items-center justify-center text-white">
    <Diamond size={30} className="-rotate-45" />
  </div>
)

const nodeTypes = {
  task: TaskNode,
  startEvent: StartEventNode,
  endEvent: EndEventNode,
  gateway: GatewayNode,
}

// Edge types
const edgeTypes = {
  default: { type: "smoothstep", markerEnd: { type: MarkerType.ArrowClosed } },
  association: { type: "straight", style: { strokeDasharray: "5,5" } },
  messageFlow: { type: "straight", style: { strokeDasharray: "5,5" }, markerEnd: { type: MarkerType.ArrowClosed } },
}

const initialNodes = [
  { id: "1", type: "startEvent", position: { x: 50, y: 100 }, data: { label: "Start" } },
  { id: "2", type: "task", position: { x: 200, y: 100 }, data: { label: "Task 1" } },
  { id: "3", type: "task", position: { x: 400, y: 100 }, data: { label: "Task 2" } },
  { id: "4", type: "endEvent", position: { x: 600, y: 100 }, data: { label: "End" } },
]

const initialEdges = [
  { id: "e1-2", source: "1", target: "2", type: "default" },
  { id: "e2-3", source: "2", target: "3", type: "default" },
  { id: "e3-4", source: "3", target: "4", type: "default" },
]

// Node creation form
function NodeCreationForm({ onClose, onCreateNode }) {
  const [nodeType, setNodeType] = useState("task")
  const [nodeLabel, setNodeLabel] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    onCreateNode(nodeType, nodeLabel)
    onClose()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="node-type">Node Type</Label>
        <Select value={nodeType} onValueChange={setNodeType}>
          <SelectTrigger>
            <SelectValue placeholder="Select Node Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="task">Task</SelectItem>
            <SelectItem value="startEvent">Start Event</SelectItem>
            <SelectItem value="endEvent">End Event</SelectItem>
            <SelectItem value="gateway">Gateway</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="node-label">Node Label</Label>
        <Input
          id="node-label"
          value={nodeLabel}
          onChange={(e) => setNodeLabel(e.target.value)}
          required
        />
      </div>
      <Button type="submit">Create Node</Button>
    </form>
  )
}

export function EnhancedBpmnProcessFlow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)
  const [showNodeCreationDialog, setShowNodeCreationDialog] = useState(false)

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges])

  const onCreateNode = useCallback((type, label) => {
    const newNode = {
      id: `${nodes.length + 1}`,
      type,
      position: { x: Math.random() * 500, y: Math.random() * 300 },
      data: { label },
    }
    setNodes((nds) => nds.concat(newNode))
  }, [nodes, setNodes])

  return (
    <Card className="w-full h-[800px]">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>BPMN Process Flow</CardTitle>
        <Dialog open={showNodeCreationDialog} onOpenChange={setShowNodeCreationDialog}>
          <DialogTrigger asChild>
            <Button><PlusCircle className="mr-2 h-4 w-4" /> Add Node</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Node</DialogTitle>
            </DialogHeader>
            <NodeCreationForm onClose={() => setShowNodeCreationDialog(false)} onCreateNode={onCreateNode} />
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent className="p-0">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          fitView
        >
          <Background />
          <Controls />
          <MiniMap />
        </ReactFlow>
      </CardContent>
    </Card>
  )
}