/**
 * Parse page selection string like "1-3, 5, 7-10" into array of page numbers
 * @param selection - User input string with page numbers and ranges
 * @param totalPages - Total number of pages in the PDF
 * @returns Array of page numbers to convert
 */
export const parsePageSelection = (selection: string, totalPages: number): number[] => {
  const pages = new Set<number>();
  
  // Split by comma and process each part
  const parts = selection.split(',').map(s => s.trim()).filter(s => s);
  
  for (const part of parts) {
    if (part.includes('-')) {
      // Range like "1-3"
      const [start, end] = part.split('-').map(s => parseInt(s.trim(), 10));
      
      if (isNaN(start) || isNaN(end) || start < 1 || end > totalPages || start > end) {
        continue; // Skip invalid ranges
      }
      
      for (let i = start; i <= end; i++) {
        pages.add(i);
      }
    } else {
      // Single page like "5"
      const page = parseInt(part, 10);
      
      if (!isNaN(page) && page >= 1 && page <= totalPages) {
        pages.add(page);
      }
    }
  }
  
  // Return sorted array
  return Array.from(pages).sort((a, b) => a - b);
};
