import React from 'react';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
}

// A last-resort safety net. If any screen throws an unexpected error, React
// would otherwise unmount the entire app and leave a blank page (this was
// the root cause behind several "blank page, can't get back to home" bug
// reports). This boundary catches that, shows a friendly recovery screen,
// and gives the farmer/buyer/admin a guaranteed way back to the home page.
export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: unknown, info: unknown) {
    // eslint-disable-next-line no-console
    console.error('KisanConnect UI error caught by ErrorBoundary:', error, info);
  }

  handleGoHome = () => {
    // A full reload is the most reliable way to guarantee a clean recovery
    // back to the landing page, regardless of which screen crashed.
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#F8FBF8] flex items-center justify-center p-6">
          <div className="max-w-md w-full bg-white rounded-3xl border border-gray-200 shadow-lg p-8 text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-100 flex items-center justify-center text-3xl">
              🌾
            </div>
            <h1 className="font-heading text-xl font-extrabold text-gray-900">
              Something went wrong on this screen
            </h1>
            <p className="text-sm text-gray-600">
              कुछ गड़बड़ हो गई। Don't worry — your data is safe. Tap below to return to the home page and try again.
            </p>
            <button
              onClick={this.handleGoHome}
              className="w-full py-3 bg-[#14532D] hover:bg-[#1E6B3C] text-[#FACC15] font-extrabold text-sm rounded-2xl shadow-md transition-colors"
            >
              ⬅ Go to Home Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
