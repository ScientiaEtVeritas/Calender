<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:template match="/">
  <html>
    <script language="javascript">
      <![CDATA[var termine = [];]]>
      <xsl:for-each select="calendar/event">
        <![CDATA[arr.push({]]>
          <![CDATA[title:"]]><xsl:value-of select="title"/><![CDATA[",]]>
          <![CDATA[startd:]]><xsl:value-of select="startd"/><![CDATA[,]]>
          <![CDATA[startm:]]><xsl:value-of select="startm"/><![CDATA[,]]>
          <![CDATA[starty:]]><xsl:value-of select="starty"/>
        <![CDATA[});]]>
      </xsl:for-each>
    </script>
  </html>
</xsl:template>
</xsl:stylesheet>

