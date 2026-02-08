from reportlab.lib import colors
from reportlab.lib.pagesizes import LETTER
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Image, Table, TableStyle, PageBreak
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.pdfgen import canvas
from reportlab.lib.enums import TA_CENTER, TA_LEFT

# Colors
COLOR_BG = colors.white
COLOR_TEXT = colors.black
COLOR_LIME = colors.HexColor('#DFFF00')
COLOR_GRAY = colors.HexColor('#CCCCCC')

# File paths
LOGO_PATH = "logo30xHCAI.png"
OUTPUT_PDF = "hcai_detalle.pdf"

# Create custom styles
styles = getSampleStyleSheet()
style_normal = styles["Normal"]
style_normal.textColor = COLOR_TEXT
style_normal.fontSize = 11
style_normal.leading = 14

style_title = ParagraphStyle(
    "HCAITitle",
    parent=styles["Heading1"],
    fontSize=26,
    leading=32,
    textColor=COLOR_TEXT,
    alignment=TA_CENTER,
    spaceAfter=10,
    backColor=COLOR_LIME,
    borderPadding=5
)

style_subtitle = ParagraphStyle(
    "HCAISubtitle",
    parent=styles["Heading2"],
    fontSize=14,
    leading=18,
    textColor=COLOR_TEXT,
    alignment=TA_CENTER,
    spaceAfter=30
)

style_h2 = ParagraphStyle(
    "HCAIHeading2",
    parent=styles["Heading2"],
    fontSize=18,
    leading=22,
    textColor=COLOR_TEXT,
    borderWidth=0,
    borderPadding=0,
    spaceBefore=20,
    spaceAfter=10,
    borderColor=COLOR_LIME,
)

style_bullet = ParagraphStyle(
    "HCAIBullet",
    parent=style_normal,
    bulletIndent=10,
    leftIndent=24,
    spaceAfter=4
)

def add_header_footer(canvas, doc):
    canvas.saveState()
    # Border around page
    canvas.setStrokeColor(COLOR_GRAY)
    canvas.setLineWidth(2)
    canvas.rect(20, 20, LETTER[0]-40, LETTER[1]-40)
    canvas.restoreState()

def create_pdf():
    doc = SimpleDocTemplate(
        OUTPUT_PDF,
        pagesize=LETTER,
        rightMargin=50,
        leftMargin=50,
        topMargin=50,
        bottomMargin=50
    )

    story = []

    # Logo
    try:
        im = Image(LOGO_PATH, width=2*inch, height=0.6*inch)
        im.hAlign = 'CENTER'
        story.append(im)
        story.append(Spacer(1, 20))
    except Exception:
        pass

    # Title
    story.append(Paragraph("HARDCORE AI BY 30X", style_title))
    story.append(Paragraph("Desarrolla un producto e2e con AI | Conecta con founders de la red 30X", style_subtitle))

    # Intro
    intro_text = """
    <b>Hardcore AI</b> es el programa de transformación de 30x para desarrolladores de software, una experiencia de 4 semanas:<br/>
    • Construye e2e más rápido y con calidad usando coding agents y AI tools<br/>
    • Despierta una mentalidad de producto y negocio (como un FDE)<br/>
    • Conecta con founders de la red 30X.
    <br/><br/>
    Además, encontrarás desarrolladores con quienes compartirás la pasión por ir más allá.
    """
    story.append(Paragraph(intro_text, style_normal))
    story.append(Spacer(1, 10))

    # Resultados
    story.append(Paragraph("RESULTADOS DE APRENDIZAJE", style_h2))
    # Draw green line manually under heading? No, use Table or simple graphics.
    # We can fake visual impact with background colors or borders in Paragraph styles or Tables.
    
    results = [
        "<b>Product Mindset:</b> empoderamiento del problema, enfoque en el producto y orientación a métricas de valor.",
        "<b>AI-DLC end-to-end:</b> desde discovery hasta observabilidad/feedback.",
        "<b>Especificación-como-código:</b> PRD/ADR en Markdown versionado.",
        "<b>Agentes y herramientas AI:</b> en cada etapa del ciclo.",
        "<b>Seguridad y performance by default:</b> SAST/DAST, Lighthouse CI, etc."
    ]
    for r in results:
        story.append(Paragraph("• " + r, style_bullet))

    # Requisitos
    story.append(Paragraph("REQUISITOS PREVIOS", style_h2))
    reqs = [
        "Programación en Javascript y/o Python",
        "Conocimientos básicos Git, GitHub, Node/TS o Python, Docker.",
        "Laptop con al menos 16GB de RAM"
    ]
    for r in reqs:
        story.append(Paragraph("• " + r, style_bullet))

    # Product Section (Highlighted)
    story.append(Spacer(1, 15))
    product_text = """
    <b>TU PRODUCTO</b><br/><br/>
    Trae el problema a resolver o la idea. Si no tienes, elige una del banco de proyectos.<br/>
    Durante cada clase recibirás una pieza del rompecabezas.<br/>
    <b>6 horas de clase</b> semanales + 6 horas de trabajo individual.<br/>
    Demo day al final de las 4 semanas.
    """
    # Create a table for the gray box effect
    t_style = TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.whitesmoke),
        ('BOX', (0,0), (-1,-1), 1, COLOR_LIME),
        ('PADDING', (0,0), (-1,-1), 12),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ])
    t = Table([[Paragraph(product_text, style_normal)]], colWidths=[450], style=t_style)
    story.append(t)

    # Tools
    story.append(Paragraph("MAPA DE HERRAMIENTAS", style_h2))
    story.append(Paragraph("AI hace la diferencia en cada etapa:", style_normal))
    tools = [
        "<b>Discovery:</b> Whisper, Notion AI",
        "<b>Specs:</b> PRD.md, MADR, Docusaurus",
        "<b>Design:</b> Uizard, v0",
        "<b>Arch:</b> DDD, C4, PlantUML",
        "<b>Impl:</b> VS Code, Copilot, Cursor, SWE-agent",
        "<b>Test:</b> Playwright, Checkly",
        "<b>Sec:</b> SAST, DAST (Sonar, ZAP)",
        "<b>Perf:</b> Lighthouse CI, k6",
        "<b>CI/CD:</b> GitHub Actions"
    ]
    
    # 2 columns for tools?
    data = []
    row = []
    for i, tool in enumerate(tools):
        row.append(Paragraph("• " + tool, style_bullet))
        if len(row) == 2:
            data.append(row)
            row = []
    if row:
        data.append(row + ['']) # padding
        
    t_tools = Table(data, colWidths=[230, 230])
    t_tools.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(t_tools)
    
    story.append(PageBreak())
    
    # Structure
    story.append(Paragraph("ESTRUCTURA DE CONTENIDO", style_h2))
    days = [
        ("Día 1", "Introducción y demostración. Tarea: Product Vision Board."),
        ("Día 2", "Descubrimiento y Definición (AI tools). Tarea: PRD en markdown."),
        ("Día 3", "Diseñando la solución, arquitectura. Tarea: MADR, tech specs."),
        ("Día 4", "Iniciando implementación. Setup IDE y agentes."),
        ("Día 5", "Ordenando implementación. DDD/BDD/TDD."),
        ("Día 6", "Reiniciando implementación. Agentes estructurados."),
        ("Día 7", "Pruebas Impulsadas por IA. Integración y funcionales."),
        ("Día 8", "Pruebas de Usuario. E2E."),
        ("Día 9", "Producción: Infraestructura en nube."),
        ("Día 10", "Producción: Seguridad."),
        ("Día 11", "Observabilidad 360."),
        ("Día 12", "Demo day.")
    ]
    
    data_days = []
    for d, desc in days:
        p_day = Paragraph(f"<b>{d}</b>", style_normal)
        p_desc = Paragraph(desc, style_normal)
        data_days.append([p_day, p_desc])
        
    t_days = Table(data_days, colWidths=[60, 400])
    t_days.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('LINEBELOW', (0,0), (-1,-1), 0.5, COLOR_GRAY),
        ('PADDING', (0,0), (-1,-1), 6),
    ]))
    story.append(t_days)
    
    # Instructors
    story.append(Paragraph("INSTRUCTORES", style_h2))
    instructors = [
        "<b>Leonardo Gonzalez:</b> Investigador AI, líder Tribu iA (20 años exp).",
        "<b>Danny Bravo:</b> AI Product Innovator, cofundador Tribu iA.",
        "<b>Carlos Alarcón:</b> Co-founder/CTO Quix, ex Platzi.",
        "<b>Christian Braatz:</b> Arquitecto de Software (20 años exp)."
    ]
    for ins in instructors:
        story.append(Paragraph("• " + ins, style_bullet))

    story.append(Paragraph("BONUS GUESTS", style_h2))
    guests = [
        "Andrés Bilbao (Co-founder Rappi/30X)",
        "Francisco Martínez (Globant/Disney)",
        "Jefferson Arcos (Head of AI)"
    ]
    for g in guests:
        story.append(Paragraph("• " + g, style_bullet))
        
    # Connection 30X highlights
    story.append(Spacer(1, 15))
    conn_text = """
    <b>CONEXIÓN CON FOUNDERS 30X</b><br/>
    Te conectaremos con la red de founders que están construyendo el futuro.<br/>
    Conectamos QUÉ se construye con CÓMO se construye.
    """
    t_conn = Table([[Paragraph(conn_text, style_normal)]], colWidths=[450])
    t_conn.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.white),
        ('BOX', (0,0), (-1,-1), 2, COLOR_TEXT), # Black border
        ('PADDING', (0,0), (-1,-1), 15),
    ]))
    story.append(t_conn)
    
    # Price
    story.append(Spacer(1, 20))
    price_style = ParagraphStyle(
        "Price", parent=style_title, fontSize=30, backColor=None, textColor=COLOR_TEXT
    )
    story.append(Paragraph("INVERSIÓN: $1.000 USD", price_style))
    story.append(Paragraph("Pago único o 2 cuotas ($600 + $400)", style_subtitle))
    
    # Date
    date_text = "<b>Inicio: Febrero 23 de 2026</b><br/>Lunes, Martes, Miércoles 7pm-9pm (Bogotá)"
    p_date = Paragraph(date_text, ParagraphStyle("Date", parent=style_normal, alignment=TA_CENTER, backColor=COLOR_LIME))
    story.append(p_date)

    doc.build(story, onFirstPage=add_header_footer, onLaterPages=add_header_footer)

if __name__ == "__main__":
    create_pdf()
