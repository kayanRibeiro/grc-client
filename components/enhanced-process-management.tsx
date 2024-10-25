"use client"

import { useState, useEffect } from "react"
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
} from "reactflow"
import "reactflow/dist/style.css"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
import { PlusCircle, Trash2 } from "lucide-react"

// Mock data for processes, sub-processes, and macro-processes
const mockMacroProcesses = [
  { id: "1", name: "Risk Management", description: "Overarching risk management activities" },
  { id: "2", name: "Compliance", description: "Ensuring adherence to regulations and standards" },
]

const mockProcesses = [
  { id: "1", name: "Risk Assessment", macroProcessId: "1", description: "Identifying and evaluating risks", owner: "Risk Manager", status: "Active", priority: "High", lastReviewDate: "2024-09-15", nextReviewDate: "2025-09-15" },
  { id: "2", name: "Compliance Monitoring", macroProcessId: "2", description: "Ongoing monitoring of compliance status", owner: "Compliance Officer", status: "Active", priority: "Medium", lastReviewDate: "2024-08-30", nextReviewDate: "2025-08-30" },
]

const mockSubProcesses = [
  { id: "1", name: "Risk Identification", processId: "1", description: "Identifying potential risks", owner: "Risk Analyst", status: "Active", estimatedDuration: "2 weeks" },
  { id: "2", name: "Risk Analysis", processId: "1", description: "Analyzing identified risks", owner: "Risk Analyst", status: "Active", estimatedDuration: "3 weeks" },
  { id: "3", name: "Regulatory Tracking", processId: "2", description: "Tracking regulatory changes", owner: "Compliance Analyst", status: "Active", estimatedDuration: "Ongoing" },
]

// Custom node types
const CustomNode = ({ data }) => {
  return (
    <div className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-stone-400">
      <div className="font-bold">{data.label}</div>
    </div>
  )
}

const nodeTypes = {
  custom: CustomNode,
}

// Process Flow Component
function ProcessFlow({ processId }) {
  const subProcesses = mockSubProcesses.filter(sp => sp.processId === processId)
  const initialNodes = subProcesses.map((sp, index) => ({
    id: sp.id,
    type: 'custom',
    data: { label: sp.name },
    position: { x: 250, y: index * 100 }
  }))
  const initialEdges = subProcesses.slice(0, -1).map((sp, index) => ({
    id: `e${sp.id}-${subProcesses[index + 1].id}`,
    source: sp.id,
    target: subProcesses[index + 1].id,
  }))

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  const onConnect = (params) => setEdges((eds) => addEdge(params, eds))

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      nodeTypes={nodeTypes}
      fitView
    >
      <Background />
      <Controls />
      <MiniMap />
    </ReactFlow>
  )
}

// Macro Process Form Component
function MacroProcessForm({ onClose, editData = null }) {
  const [name, setName] = useState(editData?.name || "")
  const [description, setDescription] = useState(editData?.description || "")

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would typically send this data to your backend
    console.log("Macro Process:", { name, description })
    onClose()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="macro-process-name">Macro Process Name</Label>
        <Input
          id="macro-process-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="macro-process-description">Description</Label>
        <Textarea
          id="macro-process-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <Button type="submit">{editData ? "Update" : "Create"} Macro Process</Button>
    </form>
  )
}

// Process Form Component
function ProcessForm({ onClose, editData = null }) {
  const [name, setName] = useState(editData?.name || "")
  const [macroProcessId, setMacroProcessId] = useState(editData?.macroProcessId || "")
  const [description, setDescription] = useState(editData?.description || "")
  const [owner, setOwner] = useState(editData?.owner || "")
  const [status, setStatus] = useState(editData?.status || "Active")
  const [priority, setPriority] = useState(editData?.priority || "Medium")
  const [lastReviewDate, setLastReviewDate] = useState(editData?.lastReviewDate || "")
  const [nextReviewDate, setNextReviewDate] = useState(editData?.nextReviewDate || "")

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would typically send this data to your backend
    console.log("Process:", { name, macroProcessId, description, owner, status, priority, lastReviewDate, nextReviewDate })
    onClose()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="process-name">Process Name</Label>
        <Input
          id="process-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="macro-process">Macro Process</Label>
        <Select value={macroProcessId} onValueChange={setMacroProcessId}>
          <SelectTrigger>
            <SelectValue placeholder="Select Macro Process" />
          </SelectTrigger>
          <SelectContent>
            {mockMacroProcesses.map((mp) => (
              <SelectItem key={mp.id} value={mp.id}>{mp.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="process-description">Description</Label>
        <Textarea
          id="process-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="process-owner">Process Owner</Label>
        <Input
          id="process-owner"
          value={owner}
          onChange={(e) => setOwner(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="process-status">Status</Label>
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger>
            <SelectValue placeholder="Select Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Active">Active</SelectItem>
            <SelectItem value="Inactive">Inactive</SelectItem>
            <SelectItem value="Under Review">Under Review</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="process-priority">Priority</Label>
        <Select value={priority} onValueChange={setPriority}>
          <SelectTrigger>
            <SelectValue placeholder="Select Priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="High">High</SelectItem>
            <SelectItem value="Medium">Medium</SelectItem>
            <SelectItem value="Low">Low</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="last-review-date">Last Review Date</Label>
        <Input
          id="last-review-date"
          type="date"
          value={lastReviewDate}
          onChange={(e) => setLastReviewDate(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="next-review-date">Next Review Date</Label>
        <Input
          id="next-review-date"
          type="date"
          value={nextReviewDate}
          onChange={(e) => setNextReviewDate(e.target.value)}
          required
        />
      </div>
      <Button type="submit">{editData ? "Update" : "Create"} Process</Button>
    </form>
  )
}

// Sub-Process Form Component
function SubProcessForm({ onClose, editData = null }) {
  const [name, setName] = useState(editData?.name || "")
  const [processId, setProcessId] = useState(editData?.processId || "")
  const [description, setDescription] = useState(editData?.description || "")
  const [owner, setOwner] = useState(editData?.owner || "")
  const [status, setStatus] = useState(editData?.status || "Active")
  const [estimatedDuration, setEstimatedDuration] = useState(editData?.estimatedDuration || "")

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would typically send this data to your backend
    console.log("Sub-Process:", { name, processId, description, owner, status, estimatedDuration })
    onClose()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="sub-process-name">Sub-Process Name</Label>
        <Input
          id="sub-process-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="process">Process</Label>
        <Select value={processId} onValueChange={setProcessId}>
          <SelectTrigger>
            <SelectValue placeholder="Select Process" />
          </SelectTrigger>
          <SelectContent>
            {mockProcesses.map((p) => (
              <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="sub-process-description">Description</Label>
        <Textarea
          id="sub-process-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="sub-process-owner">Sub-Process Owner</Label>
        <Input
          id="sub-process-owner"
          value={owner}
          onChange={(e) => setOwner(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="sub-process-status">Status</Label>
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger>
            <SelectValue placeholder="Select Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Active">Active</SelectItem>
            <SelectItem value="Inactive">Inactive</SelectItem>
            <SelectItem value="Under Review">Under Review</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="estimated-duration">Estimated Duration</Label>
        <Input
          id="estimated-duration"
          value={estimatedDuration}
          onChange={(e) => setEstimatedDuration(e.target.value)}
          required
        />
      </div>
      <Button type="submit">{editData ? "Update" : "Create"} Sub-Process</Button>
    </form>
  )
}

// Main Process Management Component
export function EnhancedProcessManagementComponent() {
  const [selectedProcessId, setSelectedProcessId] = useState(null)
  const [showNewMacroProcessDialog, setShowNewMacroProcessDialog] = useState(false)
  const [showNewProcessDialog, setShowNewProcessDialog] = useState(false)
  const [showNewSubProcessDialog, setShowNewSubProcessDialog] = useState(false)

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Enhanced GRC Process Management</h1>
      <Tabs defaultValue="macro-processes">
        <TabsList>
          <TabsTrigger value="macro-processes">Macro Processes</TabsTrigger>
          <TabsTrigger value="processes">Processes</TabsTrigger>
          <TabsTrigger value="sub-processes">Sub-Processes</TabsTrigger>
        </TabsList>
        <TabsContent value="macro-processes">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Macro Processes</CardTitle>
              <Dialog open={showNewMacroProcessDialog} onOpenChange={setShowNewMacroProcessDialog}>
                <DialogTrigger asChild>
                  <Button><PlusCircle className="mr-2 h-4 w-4" /> New Macro Process</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New Macro Process</DialogTitle>
                  </DialogHeader>
                  <MacroProcessForm onClose={() => setShowNewMacroProcessDialog(false)} />
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockMacroProcesses.map((mp) => (
                    <TableRow key={mp.id}>
                      <TableCell>{mp.name}</TableCell>
                      <TableCell>{mp.description}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">Edit</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="processes">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Processes</CardTitle>
              <Dialog open={showNewProcessDialog} onOpenChange={setShowNewProcessDialog}>
                <DialogTrigger asChild>
                  <Button><PlusCircle className="mr-2 h-4 w-4" /> New Process</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New Process</DialogTitle>
                  </DialogHeader>
                  <ProcessForm onClose={() => setShowNewProcessDialog(false)} />
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Macro Process</TableHead>
                    <TableHead>Owner</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockProcesses.map((p) => (
                    <TableRow key={p.id}>
                      <TableCell>{p.name}</TableCell>
                      <TableCell>{mockMacroProcesses.find(mp => mp.id === p.macroProcessId)?.name}</TableCell>
                      <TableCell>{p.owner}</TableCell>
                      <TableCell>{p.status}</TableCell>
                      <TableCell>{p.priority}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm" className="mr-2" onClick={() => setSelectedProcessId(p.id)}>View</Button>
                        <Button variant="outline" size="sm">Edit</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          {selectedProcessId && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Process Flow: {mockProcesses.find(p => p.id === selectedProcessId)?.name}</CardTitle>
              </CardHeader>
              <CardContent className="h-[500px]">
                <ProcessFlow processId={selectedProcessId} />
              </CardContent>
            </Card>
          )}
        </TabsContent>
        <TabsContent value="sub-processes">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Sub-Processes</CardTitle>
              <Dialog open={showNewSubProcessDialog} onOpenChange={setShowNewSubProcessDialog}>
                <DialogTrigger asChild>
                  <Button><PlusCircle className="mr-2 h-4 w-4" /> New Sub-Process</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New Sub-Process</DialogTitle>
                  </DialogHeader>
                  <SubProcessForm onClose={() => setShowNewSubProcessDialog(false)} />
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Process</TableHead>
                    <TableHead>Owner</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Estimated Duration</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockSubProcesses.map((sp) => (
                    <TableRow key={sp.id}>
                      <TableCell>{sp.name}</TableCell>
                      <TableCell>{mockProcesses.find(p => p.id === sp.processId)?.name}</TableCell>
                      <TableCell>{sp.owner}</TableCell>
                      <TableCell>{sp.status}</TableCell>
                      <TableCell>{sp.estimatedDuration}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">Edit</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}