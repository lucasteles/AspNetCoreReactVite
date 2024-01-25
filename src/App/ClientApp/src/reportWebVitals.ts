const reportWebVitals = (onPerfEntry: (_: unknown) => void) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    void import('web-vitals').then(fns => {
      fns.onCLS(onPerfEntry)
      fns.onFID(onPerfEntry)
      fns.onFCP(onPerfEntry)
      fns.onLCP(onPerfEntry)
      fns.onTTFB(onPerfEntry)
    })
  }
}

export default reportWebVitals
