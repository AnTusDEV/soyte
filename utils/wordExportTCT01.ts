import { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, AlignmentType, WidthType, BorderStyle, VerticalAlign } from 'docx';
import { saveAs } from 'file-saver';
import { formatDateVN } from '@/utils/dateUtils';

export const exportTCT01ToWord = async (
    mockData: any,
    dateFilter: { startDate: string, endDate: string },
    setLoading: (val: boolean) => void,
    onSuccess: (msg: string) => void,
    onError: (msg: string) => void
) => {
    setLoading(true);
    try {
        const children: any[] = [];
        const romanNums = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];

        const mkCell = (text: string, options: { bold?: boolean, align?: any, colSpan?: number, rowSpan?: number, fill?: string, size?: number } = {}) => {
            const { bold = false, align = AlignmentType.LEFT, colSpan = 1, rowSpan = 1, fill, size = 22 } = options;
            
            const textRuns = text.split('\n').map((t, idx, arr) => {
                const run = new TextRun({ text: t, font: "Times New Roman", size, bold });
                return idx < arr.length - 1 ? [run, new TextRun({ break: 1 })] : [run];
            }).flat();

            return new TableCell({
                columnSpan: colSpan,
                rowSpan: rowSpan,
                shading: fill ? { fill } : undefined,
                margins: { top: 100, bottom: 100, left: 100, right: 100 },
                verticalAlign: VerticalAlign.CENTER,
                children: [new Paragraph({ alignment: align, children: textRuns })]
            });
        };

        // 1. Header Table
        const now = new Date();
        children.push(new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            borders: {
                top: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                bottom: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                left: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                right: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                insideHorizontal: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                insideVertical: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
            },
            rows: [
                new TableRow({
                    children: [
                        new TableCell({
                            width: { size: 45, type: WidthType.PERCENTAGE },
                            children: [
                                new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "UBND THÀNH PHỐ HÀ NỘI", font: "Times New Roman", size: 22, bold: true })] }),
                                new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "TỔ CÔNG TÁC SỐ 01", font: "Times New Roman", size: 22, bold: true })] }),
                            ]
                        }),
                        new TableCell({
                            width: { size: 55, type: WidthType.PERCENTAGE },
                            children: [
                                new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM", font: "Times New Roman", size: 22, bold: true })] }),
                                new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Độc lập - Tự do - Hạnh phúc", font: "Times New Roman", size: 22, bold: true })] }),
                                new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "-----------------------", font: "Times New Roman", size: 22 })] }),
                                new Paragraph({ 
                                    alignment: AlignmentType.CENTER, 
                                    children: [new TextRun({ 
                                        text: `Hà Nội, ngày ${String(now.getDate()).padStart(2, '0')} tháng ${String(now.getMonth() + 1).padStart(2, '0')} năm ${now.getFullYear()}`, 
                                        font: "Times New Roman", 
                                        size: 22, 
                                        italics: true 
                                    })] 
                                }),
                            ]
                        })
                    ]
                })
            ]
        }));

        children.push(new Paragraph({ children: [] })); // Small space

        // 2. Title
        children.push(new Paragraph({
            spacing: { before: 400, after: 200 },
            alignment: AlignmentType.CENTER,
            children: [new TextRun({ text: "BÁO CÁO", font: "Times New Roman", size: 28, bold: true })]
        }));
        children.push(new Paragraph({
            spacing: { after: 200 },
            alignment: AlignmentType.CENTER,
            children: [new TextRun({ 
                text: "Kết quả thực hiện của Tổ công tác số 01 về khắc phục các tồn tại, hạn chế mang tính phổ thông năm 2026", 
                font: "Times New Roman", size: 28, bold: true 
            })]
        }));
        children.push(new Paragraph({
            spacing: { after: 400 },
            alignment: AlignmentType.CENTER,
            children: [new TextRun({ 
                text: `(Kỳ báo cáo từ ngày ${formatDateVN(dateFilter.startDate)} đến ngày ${formatDateVN(dateFilter.endDate)})`, 
                font: "Times New Roman", size: 22, italics: true 
            })]
        }));

        // 3. Intro
        const introTexts = [
            "Thực hiện Chương trình hành động số 06-CTr/TU ngày 12/01/2026 của Ban Thường vụ Thành ủy về thực hiện Nghị quyết số 72-NQ/TW ngày 09/9/2025 của Bộ Chính trị về một số giải pháp đột phá, tăng cường bảo vệ, chăm sóc và nâng cao sức khỏe Nhân dân;",
            "Quyết định số 543/QĐ-UBND ngày 04/02/2026 của UBND thành phố Hà Nội về thành lập các Tổ công tác triển khai thực hiện Chương trình hành động số 06-Ctr/TU ngày 12/01/2026 của Ban Thường vụ Thành uỷ về thực hiện Nghị quyết 72-NQ/TW ngày 09/9/2025 của Bộ Chính trị về một số giải pháp đột phá, tăng cường bảo vệ, chăm sóc và nâng cao sức khoẻ nhân dân;",
            "Kế hoạch số 71/KH-UBND ngày 26/02/2026 của UBND thành phố Hà Nội về thực hiện Chương trình hành động số 06-CTr/TU ngày 12/01/2026 của Ban Thường vụ Thành ủy thực hiện Nghị quyết số 72-NQ/TW ngày 09/9/2025 của Bộ Chính trị về một số giải pháp đột phá, tăng cường bảo vệ, chăm sóc và nâng cao sức khỏe Nhân dân, Tổ công tác số 01 về khắc phục các tồn tại, hạn chế mang tính phổ thông (Tổ công tác) đã thực hiện được các công tác như sau:"
        ];

        introTexts.forEach(text => {
            children.push(new Paragraph({
                spacing: { after: 200 },
                alignment: AlignmentType.JUSTIFIED,
                children: [new TextRun({ text, font: "Times New Roman", size: 24 })]
            }));
        });

        // 4. Section 1
        children.push(new Paragraph({
            spacing: { before: 200, after: 200 },
            children: [new TextRun({ text: "1. Công tác triển khai, hướng dẫn", font: "Times New Roman", size: 24, bold: true })]
        }));
        children.push(new Paragraph({
            spacing: { after: 200 },
            alignment: AlignmentType.JUSTIFIED,
            children: [new TextRun({ 
                text: "Phòng Kiểm tra lĩnh vực Y tế đã tham mưu Giám đốc Sở Y tế - Tổ Trưởng tổ công tác ban hành Kế hoạch số 1749/KH-SYT ngày 03/3/2026 (Kèm theo đề cương và 03 phụ lục kiểm tra về việc khắc phục tồn tại, hạn chế mang tính phổ thông năm 2026) kiểm tra việc thực hiện khắc phục các tồn tại, hạn chế mang tính phổ thông theo Chương trình hành động số 06-CTr/TU ngày 12/01/2026 của Ban Thường vụ Thành ủy thực hiện Nghị quyết số 72-NQ/TW ngày 09/9/2025 của Bộ Chính trị tại các cơ sở y tế, đơn vị trợ giúp xã hội trực thuộc và trạm y tế xã, phường.",
                font: "Times New Roman", size: 24 
            })]
        }));

        // 5. Section 2
        children.push(new Paragraph({
            spacing: { before: 200, after: 200 },
            children: [new TextRun({ text: "2. Kết quả tiếp nhận báo cáo của các đơn vị", font: "Times New Roman", size: 24, bold: true })]
        }));
        children.push(new Paragraph({
            spacing: { after: 200 },
            children: [new TextRun({ text: `(từ ngày ${formatDateVN(dateFilter.startDate)} đến ngày ${formatDateVN(dateFilter.endDate)}).`, font: "Times New Roman", size: 22 })]
        }));

        const blocks = [
            { id: '2.1', key: 'benhVien', title: 'Khối các bệnh viện trực thuộc' },
            { id: '2.2', key: 'troGiupXaHoi', title: 'Các đơn vị trợ giúp xã hội trực thuộc' },
            { id: '2.3', key: 'tramYTe', title: 'Các trạm y tế xã, phường' }
        ];

        blocks.forEach(khoi => {
            const data = mockData[khoi.key as keyof typeof mockData] as any;
            
            children.push(new Paragraph({
                spacing: { before: 200, after: 200 },
                children: [new TextRun({ text: `${khoi.id}. Kết quả triển khai thực hiện báo cáo của ${khoi.title.toLowerCase()}`, font: "Times New Roman", size: 22, bold: true })]
            }));
            children.push(new Paragraph({
                spacing: { after: 200 },
                children: [new TextRun({ text: `${khoi.id}.1. Kết quả tiếp nhận báo cáo`, font: "Times New Roman", size: 22, bold: true })],
                indent: { left: 400 }
            }));
            children.push(new Paragraph({
                spacing: { after: 200 },
                children: [new TextRun({ text: `Tổng số: ${data.tongSo} đơn vị.`, font: "Times New Roman", size: 22 })],
                indent: { left: 400 }
            }));

            // Table 2.x.1
            const rows = [
                new TableRow({
                    children: [
                        mkCell('STT', { bold: true, align: AlignmentType.CENTER, fill: "F2F2F2" }),
                        mkCell('Nội dung', { bold: true, align: AlignmentType.CENTER, fill: "F2F2F2" }),
                        mkCell('Số lượng', { bold: true, align: AlignmentType.CENTER, fill: "F2F2F2" }),
                        mkCell('Tỷ lệ', { bold: true, align: AlignmentType.CENTER, fill: "F2F2F2" }),
                    ]
                }),
                ...data.tiepNhan.map((item: any) => new TableRow({
                    children: [
                        mkCell(String(item.stt), { align: AlignmentType.CENTER }),
                        mkCell(item.noiDung),
                        mkCell(String(item.soLuong), { align: AlignmentType.CENTER }),
                        mkCell(item.tyLe, { align: AlignmentType.CENTER }),
                    ]
                }))
            ];

            children.push(new Table({
                width: { size: 100, type: WidthType.PERCENTAGE },
                rows
            }));

            children.push(new Paragraph({
                spacing: { before: 200, after: 200 },
                children: [new TextRun({ text: `${khoi.id}.2. Kết quả thực hiện theo đề cương và phụ lục báo cáo`, font: "Times New Roman", size: 22, bold: true })],
                indent: { left: 400 }
            }));
            children.push(new Paragraph({
                spacing: { after: 200 },
                children: [new TextRun({ text: `(Chỉ phân tích trên ${data.tiepNhan[0].soLuong} đơn vị báo cáo)`, font: "Times New Roman", size: 22 })],
                indent: { left: 400 }
            }));

            // Table 2.x.2
            const rows2 = [
                new TableRow({
                    children: [
                        mkCell('STT', { bold: true, align: AlignmentType.CENTER, fill: "F2F2F2" }),
                        mkCell('Nội dung', { bold: true, align: AlignmentType.CENTER, fill: "F2F2F2" }),
                        mkCell('Số lượng', { bold: true, align: AlignmentType.CENTER, fill: "F2F2F2" }),
                        mkCell('Tỷ lệ', { bold: true, align: AlignmentType.CENTER, fill: "F2F2F2" }),
                    ]
                }),
                ...data.deCuong.map((item: any) => new TableRow({
                    children: [
                        mkCell(String(item.stt), { align: AlignmentType.CENTER }),
                        mkCell(item.noiDung),
                        mkCell(String(item.soLuong), { align: AlignmentType.CENTER }),
                        mkCell(item.tyLe, { align: AlignmentType.CENTER }),
                    ]
                }))
            ];

            children.push(new Table({
                width: { size: 100, type: WidthType.PERCENTAGE },
                rows: rows2
            }));

            children.push(new Paragraph({ spacing: { after: 200 } }));
        });

        // 6. Section 3: Công tác thực hiện của các phòng
        children.push(new Paragraph({
            spacing: { before: 400, after: 200 },
            children: [new TextRun({ text: "3. Công tác thực hiện của các phòng", font: "Times New Roman", size: 24, bold: true })]
        }));

        const phongBanData = [
            {
                name: "Phòng Kế hoạch - Tài chính",
                intro: "Đã tham mưu lãnh đạo Sở Y tế các văn bản gửi UBND Thành phố:",
                details: [
                    "- Văn bản số 2040/SYT-KHTC ngày 12/3/2026 về việc rà soát, hoàn thiện dự thảo văn bản chỉ đạo của UBND Thành phố để tổ chức triển khai khắc phục các tồn tại, hạn chế mang tính phổ thông theo Chương trình số 06-CTr/TU ngày 12/01/2026 của Ban Thường vụ Thành ủy.",
                    "- Văn bản số 2254/SYT-KHTC ngày 18/3/2026 về danh mục dự án đầu tư công trung hạn giai đoạn 2026-2030 thực hiện Nghị quyết số 72-NQ/TW ngày 09/9/2025 của Bộ Chính trị."
                ]
            },
            {
                name: "Phòng Nghiệp vụ Y",
                intro: "Đã tham mưu lãnh đạo Sở Y tế ban hành các văn bản:",
                details: [
                    "- Văn bản số 2061/SYT-NVY ngày 12/3/2026 về việc thực hiện các chỉ đạo của Sở Y tế theo nhiệm vụ của chương trình số 06-CTrTU ngày 12/01/2026 của Thành Uỷ Hà Nội.",
                    "- Báo cáo 2217/BC-SYT ngày 17/3/2026 báo cáo khảo sát đánh giá sự hài lòng của người bệnh nội trú, ngoại trú và người dân sử dụng dịch vụ tiêm chủng mở rộng tháng 2 năm 2026.",
                    "- Kế hoạch số 2336/KH-SYT ngày 19/3/2026 về việc thực hiện cơ sở y tế sáng – xanh – sạch – đẹp và giảm thiểu chất thải nhựa của Ngành Y tế Hà Nội năm 2026."
                ]
            },
            {
                name: "Phòng Tổ chức cán bộ",
                intro: "Đã rà soát, hoàn thiện Đề án vị trí việc làm và cơ cấu chức danh nghề nghiệp viên chức theo hướng dẫn của Sở Nội vụ và Bộ Y tế.",
                details: []
            }
        ];

        phongBanData.forEach(phong => {
            children.push(new Paragraph({
                spacing: { before: 200, after: 100 },
                children: [new TextRun({ text: phong.name, font: "Times New Roman", size: 22, bold: true })],
                indent: { left: 400 }
            }));
            children.push(new Paragraph({
                spacing: { after: 100 },
                children: [new TextRun({ text: phong.intro, font: "Times New Roman", size: 22 })],
                indent: { left: 400 }
            }));
            phong.details.forEach(detail => {
                children.push(new Paragraph({
                    spacing: { after: 100 },
                    alignment: AlignmentType.JUSTIFIED,
                    children: [new TextRun({ text: detail, font: "Times New Roman", size: 22 })],
                    indent: { left: 800 }
                }));
            });
        });

        // 7. Section Footer (Nơi nhận)
        children.push(new Paragraph({ spacing: { before: 600 } }));
        
        const footerRows = [
            new TableRow({
                children: [
                    new TableCell({
                        width: { size: 50, type: WidthType.PERCENTAGE },
                        borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE } },
                        children: [
                            new Paragraph({ children: [new TextRun({ text: "Nơi nhận:", font: "Times New Roman", size: 22, bold: true })] }),
                            new Paragraph({ children: [new TextRun({ text: "- Ban điều hành;", font: "Times New Roman", size: 22 })] }),
                            new Paragraph({ children: [new TextRun({ text: "- Tổ công tác;", font: "Times New Roman", size: 22 })] }),
                            new Paragraph({ children: [new TextRun({ text: "- Phòng KH-TC;", font: "Times New Roman", size: 22 })] }),
                            new Paragraph({ children: [new TextRun({ text: "- Lưu: Tổ công tác.", font: "Times New Roman", size: 22 })] }),
                        ]
                    }),
                    new TableCell({
                        width: { size: 50, type: WidthType.PERCENTAGE },
                        borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE } },
                        children: [
                            new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "TỔ TRƯỞNG", font: "Times New Roman", size: 24, bold: true })] }),
                        ]
                    })
                ]
            })
        ];

        children.push(new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: footerRows,
            borders: {
                top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE },
                insideHorizontal: { style: BorderStyle.NONE }, insideVertical: { style: BorderStyle.NONE }
            }
        }));

        // 8. Appendix
        children.push(new Paragraph({
            spacing: { before: 800, after: 200 },
            alignment: AlignmentType.CENTER,
            children: [new TextRun({ text: "PHỤ LỤC", font: "Times New Roman", size: 28, bold: true })]
        }));
        children.push(new Paragraph({
            spacing: { after: 400 },
            alignment: AlignmentType.CENTER,
            children: [new TextRun({ text: "DANH SÁCH CÁC ĐƠN VỊ ĐÃ THỰC HIỆN BÁO CÁO", font: "Times New Roman", size: 24, bold: true })]
        }));

        const appendixRows: TableRow[] = [
            new TableRow({
                children: [
                    mkCell('STT', { bold: true, align: AlignmentType.CENTER, fill: "E6E6E6" }),
                    mkCell('Tên đơn vị', { bold: true, align: AlignmentType.CENTER, fill: "E6E6E6" }),
                ]
            })
        ];

        mockData.phuLuc.forEach((khoi: any, index: number) => {
            appendixRows.push(new TableRow({
                children: [
                    mkCell(romanNums[index], { bold: true, align: AlignmentType.CENTER, fill: "F2F2F2" }),
                    mkCell(khoi.nhom.toUpperCase(), { bold: true, fill: "F2F2F2" }),
                ]
            }));
            khoi.danhSach.forEach((ten: string, i: number) => {
                appendixRows.push(new TableRow({
                    children: [
                        mkCell(String(i + 1), { align: AlignmentType.CENTER }),
                        mkCell(ten),
                    ]
                }));
            });
        });

        children.push(new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: appendixRows
        }));

        const doc = new Document({
            sections: [{
                properties: {
                    page: {
                        margin: { top: 720, right: 720, bottom: 720, left: 1440 } // Standard VN margins
                    }
                },
                children
            }]
        });

        const buffer = await Packer.toBlob(doc);
        saveAs(buffer, `Bao_cao_TCT01_${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}.docx`);

        onSuccess('Đã xuất file Word báo cáo TCT01 thành công');
    } catch (error) {
        console.error("Word Export Error:", error);
        onError('Quá trình xuất Word gặp sự cố');
    } finally {
        setLoading(false);
    }
};
