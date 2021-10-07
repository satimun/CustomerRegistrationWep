import { GetObjVal, IsNull } from '@/shared/utils'
import ExcelJS from 'exceljs'

export default {
  data() {
    return {
      workbook: {}
    }
  },
  computed: {
  },
  methods: {
    setTitleStyle(worksheet, rowIndex) {
      const row = worksheet.getRow(rowIndex)
      row.font = {
        name: 'Tahoma',
        size: 16,
        bold: true,
        color: { argb: '80000000' }
      }
      row.alignment = { vertical: 'middle' }
      row.height = 30
    },
    setHeaderStyle(worksheet, rowIndex) {
      const row = worksheet.getRow(rowIndex)
      row.font = {
        name: 'Tahoma',
        size: 11,
        bold: true,
        color: { argb: '80000000' }
      }
      row.alignment = { wrapText: true, vertical: 'middle', horizontal: 'center' }
      row.height = 20
      row._cells.forEach(c => {
        const cell = worksheet.getCell(c._address)
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' }
        }
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FF9bc2e6' }
        }
      })
    },
    setBodyStyle(worksheet, rowIndex, columns) {
      const row = worksheet.getRow(rowIndex)
      row.font = {
        name: 'Tahoma',
        size: 11,
        bold: false,
        color: { argb: '80000000' }
      }
      row.alignment = { vertical: 'middle' }
      row.height = 20
      row._cells.forEach(c => {
        const cell = worksheet.getCell(c._address)
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' }
        }
      })
      let i = 0
      columns.forEach(c => {
        if (c.visible) {
          if (Array.isArray(c.groups)) {
            c.groups.forEach(g => {
              const cell = GetObjVal(row._cells[i], '_address')
              if (cell) this.setCellFormat(g, worksheet.getCell(cell))
              i++
            })
          } else {
            const cell = GetObjVal(row._cells[i], '_address')
            if (cell) this.setCellFormat(c, worksheet.getCell(cell))
            i++
          }
        }
      })
    },
    setFooterStyle(worksheet, rowIndex, columns) {
      const row = worksheet.getRow(rowIndex)
      row.font = {
        name: 'Tahoma',
        size: 11,
        bold: true,
        color: { argb: '80000000' }
      }
      row.alignment = { wrapText: true, vertical: 'middle' }
      row.height = 20
      row._cells.forEach(c => {
        const cell = worksheet.getCell(c._address)
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' }
        }
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FF9bc2e6' }
        }
      })

      let i = 0
      columns.forEach(c => {
        if (c.visible) {
          if (Array.isArray(c.groups)) {
            c.groups.forEach(g => {
              const cell = GetObjVal(row._cells[i], '_address')
              if (cell) this.setCellFormat(g, worksheet.getCell(cell))
              i++
            })
          } else {
            const cell = GetObjVal(row._cells[i], '_address')
            if (cell) this.setCellFormat(c, worksheet.getCell(cell))
            i++
          }
        }
      })
    },
    setCellFormat(column, cell) {
      if (cell) {
        if ((column.class || '').indexOf('center') > -1) cell.alignment = { vertical: 'middle', horizontal: 'center' }
        else if ((column.class || '').indexOf('right') > -1) cell.alignment = { vertical: 'middle', horizontal: 'right' }
        if (column.type == 'number') {
          cell.numFmt = '#,##0'
          if (!IsNull(cell._value)) {
            const tmp = cell._value.toString().split('.')
            if (tmp.length > 1) {
              cell.numFmt = cell.numFmt.concat('.')
              for (let i = 0; i < tmp[1].length; i++) cell.numFmt = cell.numFmt.concat('#')
            }
          }
        } else if (column.type == 'decimal') cell.numFmt = '#,##0.00'
      }
    },
    createExcel() {
      this.workbook = new ExcelJS.Workbook()
      this.workbook.creator = 'KKF Connect'
      this.workbook.lastModifiedBy = 'KKF Connect'
      this.workbook.created = new Date()
      this.workbook.modified = new Date()
      this.workbook.lastPrinted = new Date()
    },
    getLength(val) {
      return !val ? 0 : (val + '').length
    },
    getWidth(c, r) {
      if (c.width) {
        c._width = c.width
      } else {
        let tmpc = c._title
        if (tmpc) {
          tmpc = !tmpc ? '' : tmpc + ''
          tmpc = tmpc.replace(/[ิีืึุู์ฺํ๊๋่้็ัเไใ]*/g, '')
        }
        tmpc = (this.getLength(tmpc) + 5) * 8 // 7

        let tmpr = GetObjVal(r, c.name)
        if (tmpr) {
          tmpr = !tmpr ? '' : tmpr + ''

          tmpr = tmpr.replace(/.+>(.*)<.+/g, '$1')
          tmpr = tmpr.replace(/[ิีืึุู์ฺํ๊๋่้็ัเไใ]*/g, '')
        }
        tmpr = (this.getLength(tmpr) + 5) * 8 // 7
        c._width = !c._width ? 0 : c._width
        if (tmpr > c._width || tmpc > c._width) {
          c._width = Math.max(tmpr, tmpc)
        }
      }
    },
    preCreateHeader(columns, data) {
      data.forEach(r => {
        columns.forEach(c => {
          if (c.visible) {
            if (!c.o_col) {
              if (Array.isArray(c.groups)) {
                if (c.width) {
                  c._width = c.width
                } else {
                  c._width = 0
                  c.groups.forEach(g => {
                    this.getWidth(g, r)
                    c._width += g._width
                  })
                }
              } else {
                this.getWidth(c, r)
              }
            }
          }
        })
      })
    },
    createHeader(worksheet, columns) {
      const head1 = []; const head2 = []; let colGroup = false
      columns.forEach(c => {
        if (c.visible) {
          if (Array.isArray(c.groups)) {
            c.groups.forEach((g, i) => {
              if (!i) head1.push(c._title)
              else head1.push(null)
              head2.push(g._title)
              worksheet.getColumn(head2.length).width = (g._width || g.width) / 8
              colGroup = true
            })
          } else {
            head1.push(c._title)
            worksheet.getColumn(head1.length).width = (c._width || c.width) / 8
            head2.push(null)
          }
        }
      })
      worksheet.addRows([head1])
      this.setHeaderStyle(worksheet, 2)

      if (colGroup) {
        let idf = 0; let idl = 0
        worksheet.addRows([head2])
        columns.forEach(c => {
          if (c.visible) {
            if (Array.isArray(c.groups)) {
              c.groups.forEach((g, i) => {
                if (!i) {
                  idf++; idl++
                } else idl++
                head2.push(g._title)
                colGroup = true
              })
              worksheet.mergeCells(2, idf, 2, idl)
              idf = idl
            } else {
              idf++; idl++
              worksheet.mergeCells(2, idf, 3, idl)
            }
          }
        })
        this.setHeaderStyle(worksheet, 3)
      }
    },
    generateBody(columns, item) {
      const row = []
      columns.forEach(c => {
        if (c.visible) {
          if (Array.isArray(c.groups)) {
            c.groups.forEach(g => {
              const value = GetObjVal(item, g.name)
              row.push(value)
            })
          } else {
            const value = GetObjVal(item, c.name)
            row.push(value)
          }
        }
      })
      return row
    },
    generateFooter(columns) {
      const row = []
      columns.forEach(c => {
        if (c.visible) {
          if (Array.isArray(c.groups)) {
            c.groups.forEach(g => {
              const value = GetObjVal(g, 'footer.value')
              row.push(value)
            })
          } else {
            const value = GetObjVal(c, 'footer.value')
            row.push(value)
          }
        }
      })
      return row
    }
  }
}
