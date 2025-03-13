"use client"

import { Component, ReactNode } from "react"

interface ClubPediaErrorBoundaryProps {
  children: ReactNode
  fallback: (props: any) => React.JSX.Element
}

interface ClubPediaErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

export class ClubPediaErrorBoundary extends Component<ClubPediaErrorBoundaryProps, ClubPediaErrorBoundaryState> {
  constructor(props: ClubPediaErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): ClubPediaErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo)
    this.setState({ hasError: true, error })
  }

  resetError = () => {
    this.setState({ hasError: false, error: null })
    window.location.reload()
  }

  render() {
    const { hasError, error } = this.state
    const { fallback: Fallback } = this.props
    if (hasError) {
      return <Fallback error={error} resetError={this.resetError} />
    }
    return this.props.children
  }
}
