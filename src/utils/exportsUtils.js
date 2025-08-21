 // utils/exportsUtils.js
import jsPDF from "jspdf";
import * as XLSX from "xlsx";
import autoTable from "jspdf-autotable";

export const exportReportToPDF = (report, range, month, year, farmerName = "Farmer", farmName = "Farm") => {
  if (!report) return;

  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.width;
  const pageHeight = doc.internal.pageSize.height;
  
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  
  let periodText = "";
  if (range === "monthly") periodText = `${monthNames[month - 1]} ${year}`;
  else if (range === "yearly") periodText = `Year ${year}`;
  else periodText = range;

  const generatedDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  // Header with Company/Farm Info
  doc.setFillColor(76, 175, 80);
  doc.rect(0, 0, pageWidth, 35, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.setFont("helvetica", "bold");
  doc.text("SALES PERFORMANCE REPORT", pageWidth / 2, 15, { align: 'center' });
  
  doc.setFontSize(14);
  doc.setFont("helvetica", "normal");
  doc.text(farmName || "Agricultural Enterprise", pageWidth / 2, 25, { align: 'center' });

  // Report Header Information
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("REPORT DETAILS", 14, 50);
  
  doc.setFont("helvetica", "normal");
  const reportDetails = [
    [`Report Period:`, periodText],
    [`Prepared For:`, farmerName],
    [`Generated On:`, generatedDate],
    [`Report Type:`, `Sales Analysis & Performance`],
    [`Document ID:`, `RPT-${Date.now().toString().slice(-8)}`]
  ];

  let yPos = 60;
  reportDetails.forEach(([label, value]) => {
    doc.setFont("helvetica", "bold");
    doc.text(label, 14, yPos);
    doc.setFont("helvetica", "normal");
    doc.text(value, 80, yPos);
    yPos += 8;
  });

  // Executive Summary Box
  doc.setFillColor(245, 245, 245);
  doc.rect(14, yPos + 10, pageWidth - 28, 30, 'F');
  doc.setDrawColor(76, 175, 80);
  doc.rect(14, yPos + 10, pageWidth - 28, 30, 'S');
  
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(76, 175, 80);
  doc.text("EXECUTIVE SUMMARY", 20, yPos + 20);
  
  doc.setFontSize(10);
  doc.setTextColor(0, 0, 0);
  doc.setFont("helvetica", "normal");
  doc.text(`Total Revenue: Rs ${report.totalSales.toLocaleString()}`, 20, yPos + 28);
  doc.text(`Total Orders: ${report.totalOrders.toLocaleString()}`, 20, yPos + 35);
  
  if (report.totalOrders > 0) {
    const avgOrderValue = report.totalSales / report.totalOrders;
    doc.text(`Average Order Value: Rs ${avgOrderValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}`, 120, yPos + 28);
  }

  // Key Performance Metrics
  yPos += 55;
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(0, 0, 0);
  doc.text("KEY PERFORMANCE METRICS", 14, yPos);

  const metricsData = [
    ["Metric", "Value", "Performance Indicator"],
    ["Total Revenue", `Rs ${report.totalSales.toLocaleString()}`, report.totalSales > 50000 ? "Excellent" : report.totalSales > 20000 ? "Good" : "Needs Improvement"],
    ["Total Orders", report.totalOrders.toLocaleString(), report.totalOrders > 50 ? "High Volume" : report.totalOrders > 20 ? "Moderate" : "Low Volume"],
    ["Product Variety", report.topProducts ? report.topProducts.length.toString() : "0", report.topProducts && report.topProducts.length > 5 ? "Diverse" : "Limited"],
    ["Revenue per Product", report.topProducts && report.topProducts.length > 0 ? `Rs ${Math.round(report.totalSales / report.topProducts.length).toLocaleString()}` : "N/A", "Average Performance"]
  ];

  autoTable(doc, {
    startY: yPos + 5,
    head: [metricsData[0]],
    body: metricsData.slice(1),
    theme: "striped",
    headStyles: { 
      fillColor: [46, 125, 50], 
      textColor: [255, 255, 255],
      fontSize: 10,
      fontStyle: 'bold'
    },
    bodyStyles: { fontSize: 9 },
    columnStyles: {
      0: { fontStyle: 'bold', cellWidth: 50 },
      1: { cellWidth: 40, halign: 'center' },
      2: { cellWidth: 50, halign: 'center' }
    },
    margin: { left: 14, right: 14 }
  });

  // Product Performance Analysis
  if (report.topProducts && report.topProducts.length > 0) {
    // Add new page if needed
    if (doc.lastAutoTable.finalY > pageHeight - 80) {
      doc.addPage();
      yPos = 20;
    } else {
      yPos = doc.lastAutoTable.finalY + 15;
    }

    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("PRODUCT PERFORMANCE ANALYSIS", 14, yPos);

    // Top 5 Products Performance
    const topProductsData = [
      ["Rank", "Product Name", "Revenue (Rs)", "Qty Sold", "Unit Type", "Revenue %"]
    ];

    report.topProducts.slice(0, 5).forEach((product, index) => {
      const revenuePercentage = ((product.revenue / report.totalSales) * 100).toFixed(1);
      topProductsData.push([
        (index + 1).toString(),
        product.name,
        product.revenue.toLocaleString(),
        product.quantity.toString(),
        product.measurementType === 'kg' ? 'Kg' : 'Units',
        `${revenuePercentage}%`
      ]);
    });

    autoTable(doc, {
      startY: yPos + 5,
      head: [topProductsData[0]],
      body: topProductsData.slice(1),
      theme: "grid",
      headStyles: { 
        fillColor: [76, 175, 80], 
        textColor: [255, 255, 255],
        fontSize: 10,
        fontStyle: 'bold'
      },
      bodyStyles: { fontSize: 9 },
      columnStyles: {
        0: { halign: 'center', cellWidth: 20 },
        1: { cellWidth: 60 },
        2: { halign: 'right', cellWidth: 30 },
        3: { halign: 'right', cellWidth: 25 },
        4: { halign: 'center', cellWidth: 25 },
        5: { halign: 'right', cellWidth: 25 }
      },
      margin: { left: 14, right: 14 }
    });

    // Complete Product Inventory Summary
    yPos = doc.lastAutoTable.finalY + 15;
    
    if (yPos > pageHeight - 60) {
      doc.addPage();
      yPos = 20;
    }

    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("COMPLETE PRODUCT INVENTORY", 14, yPos);

    const allProductsData = [
      ["S.No", "Product Name", "Revenue (Rs)", "Quantity", "Unit", "% of Total Sales"]
    ];

    let totalRevenue = 0;
    let totalQuantity = 0;

    report.topProducts.forEach((product, index) => {
      const revenuePercentage = ((product.revenue / report.totalSales) * 100).toFixed(1);
      totalRevenue += product.revenue;
      totalQuantity += product.quantity;
      
      allProductsData.push([
        (index + 1).toString(),
        product.name,
        product.revenue.toLocaleString(),
        product.quantity.toString(),
        product.measurementType === 'kg' ? 'Kg' : 'Units',
        `${revenuePercentage}%`
      ]);
    });

    // Add totals row
    allProductsData.push([
      "TOTAL",
      `${report.topProducts.length} Products`,
      totalRevenue.toLocaleString(),
      totalQuantity.toString(),
      "Mixed",
      "100.0%"
    ]);

    autoTable(doc, {
      startY: yPos + 5,
      head: [allProductsData[0]],
      body: allProductsData.slice(1),
      theme: "striped",
      headStyles: { 
        fillColor: [21, 163, 74], 
        textColor: [255, 255, 255],
        fontSize: 10,
        fontStyle: 'bold'
      },
      bodyStyles: { fontSize: 9 },
      columnStyles: {
        0: { halign: 'center', cellWidth: 20 },
        1: { cellWidth: 60 },
        2: { halign: 'right', cellWidth: 30 },
        3: { halign: 'right', cellWidth: 25 },
        4: { halign: 'center', cellWidth: 25 },
        5: { halign: 'right', cellWidth: 25 }
      },
      didParseCell: function (data) {
        // Style the totals row
        if (data.row.index === allProductsData.length - 2) {
          data.cell.styles.fillColor = [240, 240, 240];
          data.cell.styles.fontStyle = 'bold';
        }
      },
      margin: { left: 14, right: 14 }
    });
  }

  // Customer Satisfaction Analysis
  if (report.ratings && report.ratings.length > 0) {
    yPos = doc.lastAutoTable.finalY + 15;
    
    if (yPos > pageHeight - 60) {
      doc.addPage();
      yPos = 20;
    }

    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("CUSTOMER SATISFACTION ANALYSIS", 14, yPos);

    const sortedRatings = [...report.ratings].sort((a, b) => b.avgRating - a.avgRating);
    const avgRating = sortedRatings.reduce((sum, r) => sum + r.avgRating, 0) / sortedRatings.length;
    const totalReviews = sortedRatings.reduce((sum, r) => sum + r.totalRatings, 0);

    const ratingsData = [
      ["Metric", "Value", "Status"],
      ["Overall Average Rating", avgRating.toFixed(2) + "/5.0", avgRating >= 4.0 ? "Excellent" : avgRating >= 3.0 ? "Good" : "Needs Improvement"],
      ["Total Reviews Received", totalReviews.toString(), totalReviews > 100 ? "High Engagement" : "Moderate Engagement"],
      ["Products Rated", sortedRatings.length.toString(), "Customer Feedback Available"],
    ];

    if (sortedRatings.length > 0) {
      const best = sortedRatings[0];
      const least = sortedRatings[sortedRatings.length - 1];
      
      ratingsData.push(
        ["Highest Rated Product", `${best.productName} (${best.avgRating.toFixed(1)}/5)`, "Top Performer"],
        ["Lowest Rated Product", `${least.productName} (${least.avgRating.toFixed(1)}/5)`, "Needs Attention"]
      );
    }

    autoTable(doc, {
      startY: yPos + 5,
      head: [ratingsData[0]],
      body: ratingsData.slice(1),
      theme: "grid",
      headStyles: { 
        fillColor: [255, 152, 0], 
        textColor: [255, 255, 255],
        fontSize: 10,
        fontStyle: 'bold'
      },
      bodyStyles: { fontSize: 9 },
      columnStyles: {
        0: { fontStyle: 'bold', cellWidth: 70 },
        1: { cellWidth: 60, halign: 'center' },
        2: { cellWidth: 55, halign: 'center' }
      },
      margin: { left: 14, right: 14 }
    });
  }

  // Add Footer
  const finalY = doc.lastAutoTable ? doc.lastAutoTable.finalY : yPos + 50;
  
  if (finalY > pageHeight - 40) {
    doc.addPage();
  }

  // Footer section
  doc.setFontSize(8);
  doc.setTextColor(100, 100, 100);
  doc.text("This report is confidential and intended solely for business analysis purposes.", 14, pageHeight - 25);
  doc.text(`Report generated automatically on ${generatedDate}`, 14, pageHeight - 20);
  doc.text(`Page 1 of ${doc.getNumberOfPages()}`, pageWidth - 40, pageHeight - 15);

  // Add page numbers to all pages
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(100, 100, 100);
    doc.text(`Page ${i} of ${pageCount}`, pageWidth - 40, pageHeight - 15);
  }

  doc.save(`Sales-Report-${periodText.replace(/\s+/g, '-')}-${Date.now()}.pdf`);
};

export const exportReportToExcel = (report, range, month, year, farmerName = "Farmer", farmName = "Farm") => {
  if (!report) return;

  const wb = XLSX.utils.book_new();
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  
  let periodText = "";
  if (range === "monthly") periodText = `${monthNames[month - 1]} ${year}`;
  else if (range === "yearly") periodText = `Year ${year}`;
  else periodText = range;

  const generatedDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  // Executive Summary Sheet
  const summaryData = [
    ["SALES PERFORMANCE REPORT"],
    [farmName || "Agricultural Enterprise"],
    [""],
    ["REPORT INFORMATION"],
    ["Report Period", periodText],
    ["Prepared For", farmerName],
    ["Generated On", generatedDate],
    ["Document ID", `RPT-${Date.now().toString().slice(-8)}`],
    [""],
    ["EXECUTIVE SUMMARY"],
    ["Total Revenue (Rs)", report.totalSales],
    ["Total Orders", report.totalOrders],
    ["Average Order Value (Rs)", report.totalOrders > 0 ? Math.round(report.totalSales / report.totalOrders) : 0],
    ["Product Variety", report.topProducts ? report.topProducts.length : 0],
    ["Revenue per Product (Rs)", report.topProducts && report.topProducts.length > 0 ? Math.round(report.totalSales / report.topProducts.length) : 0],
    [""],
    ["PERFORMANCE INDICATORS"],
    ["Revenue Status", report.totalSales > 50000 ? "Excellent" : report.totalSales > 20000 ? "Good" : "Needs Improvement"],
    ["Order Volume", report.totalOrders > 50 ? "High Volume" : report.totalOrders > 20 ? "Moderate" : "Low Volume"],
    ["Product Diversity", report.topProducts && report.topProducts.length > 5 ? "Diverse Portfolio" : "Limited Range"]
  ];

  const wsSummary = XLSX.utils.aoa_to_sheet(summaryData);
  
  // Style the summary sheet
  wsSummary['!cols'] = [{ width: 25 }, { width: 20 }];
  
  XLSX.utils.book_append_sheet(wb, wsSummary, "Executive Summary");

  // Top Products Performance Sheet
  if (report.topProducts && report.topProducts.length > 0) {
    const topProductsData = [
      ["TOP PRODUCTS PERFORMANCE ANALYSIS"],
      [""],
      ["Rank", "Product Name", "Revenue (Rs)", "Quantity Sold", "Unit Type", "Revenue %", "Performance Category"],
    ];

    report.topProducts.slice(0, 10).forEach((product, index) => {
      const revenuePercentage = ((product.revenue / report.totalSales) * 100).toFixed(1);
      const category = revenuePercentage > 20 ? "Star Product" : 
                      revenuePercentage > 10 ? "Strong Performer" : 
                      revenuePercentage > 5 ? "Average Performer" : "Low Performer";
      
      topProductsData.push([
        index + 1,
        product.name,
        product.revenue,
        product.quantity,
        product.measurementType === 'kg' ? 'Kilogram' : 'Units',
        `${revenuePercentage}%`,
        category
      ]);
    });

    const wsTopProducts = XLSX.utils.aoa_to_sheet(topProductsData);
    wsTopProducts['!cols'] = [
      { width: 8 }, { width: 30 }, { width: 15 }, { width: 15 }, 
      { width: 12 }, { width: 12 }, { width: 18 }
    ];
    
    XLSX.utils.book_append_sheet(wb, wsTopProducts, "Top Products");

    // Complete Product Inventory
    const allProductsData = [
      ["COMPLETE PRODUCT INVENTORY"],
      [""],
      ["S.No", "Product Name", "Revenue (Rs)", "Quantity", "Unit Type", "% of Total Sales", "Category"],
    ];

    report.topProducts.forEach((product, index) => {
      const revenuePercentage = ((product.revenue / report.totalSales) * 100).toFixed(1);
      const category = product.revenue > report.totalSales * 0.2 ? "High Revenue" :
                      product.revenue > report.totalSales * 0.1 ? "Medium Revenue" : "Low Revenue";
      
      allProductsData.push([
        index + 1,
        product.name,
        product.revenue,
        product.quantity,
        product.measurementType === 'kg' ? 'Kilogram' : 'Units',
        `${revenuePercentage}%`,
        category
      ]);
    });

    // Add summary row
    allProductsData.push([
      "",
      "TOTAL SUMMARY",
      report.totalSales,
      report.topProducts.reduce((sum, p) => sum + p.quantity, 0),
      "Mixed Units",
      "100.00%",
      "Overall Performance"
    ]);

    const wsAllProducts = XLSX.utils.aoa_to_sheet(allProductsData);
    wsAllProducts['!cols'] = [
      { width: 8 }, { width: 30 }, { width: 15 }, { width: 12 }, 
      { width: 12 }, { width: 15 }, { width: 18 }
    ];
    
    XLSX.utils.book_append_sheet(wb, wsAllProducts, "Complete Inventory");
  }

  // Customer Satisfaction Analysis
  if (report.ratings && report.ratings.length > 0) {
    const sortedRatings = [...report.ratings].sort((a, b) => b.avgRating - a.avgRating);
    const avgRating = sortedRatings.reduce((sum, r) => sum + r.avgRating, 0) / sortedRatings.length;
    const totalReviews = sortedRatings.reduce((sum, r) => sum + r.totalRatings, 0);

    const ratingsData = [
      ["CUSTOMER SATISFACTION ANALYSIS"],
      [""],
      ["OVERALL METRICS"],
      ["Average Rating", avgRating.toFixed(2) + "/5.0"],
      ["Total Reviews", totalReviews],
      ["Products Rated", sortedRatings.length],
      ["Satisfaction Level", avgRating >= 4.0 ? "Excellent" : avgRating >= 3.0 ? "Good" : "Needs Improvement"],
      [""],
      ["PRODUCT RATINGS BREAKDOWN"],
      ["Product Name", "Average Rating", "Total Reviews", "Rating Category", "Recommendation"]
    ];

    sortedRatings.forEach(rating => {
      const category = rating.avgRating >= 4.5 ? "Outstanding" :
                      rating.avgRating >= 4.0 ? "Excellent" :
                      rating.avgRating >= 3.5 ? "Good" :
                      rating.avgRating >= 3.0 ? "Average" : "Poor";
      
      const recommendation = rating.avgRating >= 4.0 ? "Maintain Quality" :
                            rating.avgRating >= 3.0 ? "Minor Improvements" : "Major Review Needed";

      ratingsData.push([
        rating.productName,
        rating.avgRating.toFixed(1),
        rating.totalRatings,
        category,
        recommendation
      ]);
    });

    const wsRatings = XLSX.utils.aoa_to_sheet(ratingsData);
    wsRatings['!cols'] = [
      { width: 30 }, { width: 15 }, { width: 15 }, { width: 18 }, { width: 20 }
    ];
    
    XLSX.utils.book_append_sheet(wb, wsRatings, "Customer Satisfaction");
  }

  // Financial Analysis Sheet
  const financialData = [
    ["FINANCIAL ANALYSIS"],
    [""],
    ["REVENUE BREAKDOWN"],
    ["Total Sales Revenue", `Rs ${report.totalSales.toLocaleString()}`],
    ["Total Orders Processed", report.totalOrders.toLocaleString()],
    ["Average Order Value", `Rs ${report.totalOrders > 0 ? Math.round(report.totalSales / report.totalOrders).toLocaleString() : '0'}`],
    [""],
    ["BUSINESS METRICS"],
    ["Products in Portfolio", report.topProducts ? report.topProducts.length : 0],
    ["Revenue per Product", `Rs ${report.topProducts && report.topProducts.length > 0 ? Math.round(report.totalSales / report.topProducts.length).toLocaleString() : '0'}`],
    ["Business Performance", report.totalSales > 100000 ? "Excellent" : report.totalSales > 50000 ? "Good" : "Developing"],
  ];

  const wsFinancial = XLSX.utils.aoa_to_sheet(financialData);
  wsFinancial['!cols'] = [{ width: 25 }, { width: 20 }];
  XLSX.utils.book_append_sheet(wb, wsFinancial, "Financial Analysis");

  XLSX.writeFile(wb, `Sales-Report-${periodText.replace(/\s+/g, '-')}-${Date.now()}.xlsx`);
};