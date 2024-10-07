import React, { useState } from "react"
import { fetchWords } from "./api/fetchwords.js"
import WordFetcher from "./WordFetcher"
import Rules from "./Rules"
import WordList from "./WordList"
import { Button } from "@/components/ui/button"

const App = () => {
  const [description, setDescription] = useState("")
  const [limit, setLimit] = useState(5)
  const [words, setWords] = useState([])
  const [loading, setLoading] = useState(false)
  const [rules, setRules] = useState([])
  const [matchString, setMatchString] = useState("")
  const [label, setLabel] = useState("")
  const [color, setColor] = useState("#77a8f7") 

  // Sample data
  const sampleWords = [
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
    "ten"
  ]
  const sampleRules = [
    {
      match: "i",
      label: "yip",
      color: "#ebc2c2"
    },
    {
      match: "e",
      label: "yep",
      color: "#dbde4f"
    },
    {
      match: "i,e",
      label: "yipes",
      color: "#738fe2"
    }
  ]

  // Load sample words and rules when button is clicked
  const handleLoadSample = () => {
    setWords(sampleWords)
    setRules(sampleRules)
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    try {
      const result = await fetchWords(description, limit)
      setWords(result)
    } catch (error) {
      console.error("Error fetching words:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddRule = () => {
    setRules([...rules, { match: matchString, label, color }])
    setMatchString("")
    setLabel("")
    setColor("#77a8f7") // Reset to default color
  }

  const handleUpdateRuleColor = (index, newColor) => {
    const updatedRules = rules.map((rule, ruleIndex) =>
      ruleIndex === index ? { ...rule, color: newColor } : rule
    )
    setRules(updatedRules)
  }

  // Function to handle deleting a rule
  const handleDeleteRule = index => {
    const updatedRules = rules.filter((_, ruleIndex) => ruleIndex !== index)
    setRules(updatedRules)
  }

  return (
    <div className="min-h-screen flex items-center justify-center w-screen bg-gray-100">
      <div className="container mx-auto p-4 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-8 text-center">
          Word Fetch and Analyser
        </h1>

        <div className="flex flex-col md:flex-row justify-around space-y-8 md:space-y-0 gap-3">
          <WordFetcher
            description={description}
            setDescription={setDescription}
            limit={limit}
            setLimit={setLimit}
            handleSubmit={handleSubmit}
            loading={loading}
          />
          <Rules
            matchString={matchString}
            setMatchString={setMatchString}
            label={label}
            setLabel={setLabel}
            color={color}
            setColor={setColor}
            rules={rules}
            handleAddRule={handleAddRule}
            handleUpdateRuleColor={handleUpdateRuleColor}
            handleDeleteRule={handleDeleteRule}
          />
        </div>

        {/* Load Sample Button */}
        <div className="text-center my-4">
          <Button onClick={handleLoadSample} variant="outline">
            Load Sample
          </Button>
        </div>

        <WordList words={words} rules={rules} />
      </div>
    </div>
  )
}

export default App
