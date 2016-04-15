/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mycompany.methotels.entities;

import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import org.apache.tapestry5.beaneditor.Validate;
import org.apache.tapestry5.ioc.annotations.Inject;

/**
 *
 * @author Jovana Kovac
 */
@Entity
@Table(name = "rezervacija")
@NamedQueries({
    @NamedQuery(name = "Rezervacija.findAll", query = "SELECT r FROM Rezervacija r")})
public class Rezervacija implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "REZERVACIJA_id")
    private Integer rEZERVACIJAid;
    @Basic(optional = false)
    @Column(name = "IME")
    private String ime;
    @Basic(optional = false)
    @Column(name = "PREZIME")
    private String prezime;
    @Basic(optional = false)
    @Column(name = "SOBA")
    private String soba;

    @Inject
    public Rezervacija() {
    }

    public Rezervacija(Integer rEZERVACIJAid) {
        this.rEZERVACIJAid = rEZERVACIJAid;
    }

    public Rezervacija(Integer rEZERVACIJAid, String ime, String prezime, String soba) {
        this.rEZERVACIJAid = rEZERVACIJAid;
        this.ime = ime;
        this.prezime = prezime;
        this.soba = soba;
    }

    public Integer getREZERVACIJAid() {
        return rEZERVACIJAid;
    }

    public void setREZERVACIJAid(Integer rEZERVACIJAid) {
        this.rEZERVACIJAid = rEZERVACIJAid;
    }
    @Validate("required")
    public String getIme() {
        return ime;
    }

    public void setIme(String ime) {
        this.ime = ime;
    }
@Validate("required")
    public String getPrezime() {
        return prezime;
    }

    public void setPrezime(String prezime) {
        this.prezime = prezime;
    }
@Validate("required")
    public String getSoba() {
        return soba;
    }

    public void setSoba(String soba) {
        this.soba = soba;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (rEZERVACIJAid != null ? rEZERVACIJAid.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Rezervacija)) {
            return false;
        }
        Rezervacija other = (Rezervacija) object;
        if ((this.rEZERVACIJAid == null && other.rEZERVACIJAid != null) || (this.rEZERVACIJAid != null && !this.rEZERVACIJAid.equals(other.rEZERVACIJAid))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.mycompany.methotels.entities.Rezervacija[ rEZERVACIJAid=" + rEZERVACIJAid + " ]";
    }

}
