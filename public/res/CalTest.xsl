<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:template match="/">
  <html>
      <xsl:for-each select="calendar/event">
        <![CDATA[termine.push({]]>
          <![CDATA[title:"]]><xsl:value-of select="title"/><![CDATA[",]]>
          <![CDATA[place:"]]><xsl:value-of select="place"/><![CDATA[",]]>
          <![CDATA[startd:]]><xsl:value-of select="startd"/><![CDATA[,]]>
          <![CDATA[startm:]]><xsl:value-of select="startm"/><![CDATA[,]]>
          <![CDATA[starty:]]><xsl:value-of select="starty"/><![CDATA[,]]>
          <![CDATA[endd:]]><xsl:value-of select="endd"/><![CDATA[,]]>
          <![CDATA[endm:]]><xsl:value-of select="endm"/><![CDATA[,]]>
          <![CDATA[endy:]]><xsl:value-of select="endy"/><![CDATA[,]]>
          <![CDATA[startts:]]><xsl:value-of select="startts"/><![CDATA[,]]>
          <![CDATA[starttm:]]><xsl:value-of select="starttm"/><![CDATA[,]]>
          <![CDATA[starttse:]]><xsl:value-of select="starttse"/><![CDATA[,]]>
          <![CDATA[endts:]]><xsl:value-of select="endts"/><![CDATA[,]]>
          <![CDATA[endtm:]]><xsl:value-of select="endtm"/><![CDATA[,]]>
          <![CDATA[endtse:]]><xsl:value-of select="endtse"/>
        <![CDATA[});]]>
        <![CDATA[loadAppointments();]]>
        <![CDATA[refresh();]]>
      </xsl:for-each>
  </html>
</xsl:template>
</xsl:stylesheet>

