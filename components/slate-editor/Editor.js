import React from 'react'
// Import the Slate editor.
import { Editor } from 'slate-react';
import { Value } from 'slate';


const initialValue = Value.fromJSON({
  document: {
    nodes: [
      {
        object: 'block',
        type: 'paragraph',
        nodes: [
          {
            object: 'text',
            leaves: [
              {
                text: 'A line of text in a paragraph.',
              },
            ],
          },
        ],
      },
    ],
  },
})

// Define a React component renderer for our code blocks.
function CodeNode(props) {
  return (
    <pre {...props.attributes}>
      <code>{props.children}</code>
    </pre>
  )
}

export default class SlateEditor extends React.Component {
  state = {
    value: initialValue,
    isLoaded: false
  }

  componentDidMount() {
    this.setState({isLoaded: true});
  }
  
  onChange = ({ value }) => {
    this.setState({ value })
  }

  onKeyDown = (event, editor, next) => {
    if (event.key != '`' || !event.ctrlKey) return next()
    
    event.preventDefault()

    // Determine whether any of the currently selected blocks are code blocks.
    const isCode = editor.value.blocks.some(block => block.type == 'code')

    // Toggle the block type depending on `isCode`.
    editor.setBlocks(isCode ? 'paragraph' : 'code')
  }

  // Add a `renderNode` method to render a `CodeNode` for code blocks.
  renderNode = (props, editor, next) => {
    switch (props.node.type) {
      case 'code':
        return <CodeNode {...props} />
      case 'paragraph':
        return <p {...props.attributes}>{props.children}</p>
      default:
        return next()
    }
  }

  render() {
    const { isLoaded, value } = this.state;
    return (
      <React.Fragment>
        { isLoaded && <Editor value={value} 
                              onChange={this.onChange} 
                              onKeyDown={this.onKeyDown}
                              renderNode={this.renderNode}
                              /> }
      </React.Fragment>
    )
  }
}