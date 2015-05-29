<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:template match="/">
  <html>
  <head>
  <link rel="stylesheet" href="stylesheet.css" type="text/css">
  </head>
  <body>
  <h1>Calendar</h1>
    <table border="1">
      <tr bgcolor="#9acd32">
        <th style="text-align:left">Title</th>
        <th style="text-align:left">Start Datum</th>
      </tr>
      <xsl:for-each select="calendar/event">
      <tr>
        <td><xsl:value-of select="title"/></td>
        <td><xsl:value-of select="startd"/>.<xsl:value-of select="startm"/>.<xsl:value-of select="starty"/></td>
      </tr>
      </xsl:for-each>
    </table>
  </body>
  </html>
</xsl:template>
</xsl:stylesheet>

