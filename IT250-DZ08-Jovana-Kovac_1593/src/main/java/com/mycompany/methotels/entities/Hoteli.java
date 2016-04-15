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
import javax.persistence.JoinColumn;
import javax.persistence.Lob;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import org.apache.tapestry5.beaneditor.Validate;
import org.apache.tapestry5.ioc.annotations.Inject;

/**
 *
 * @author Jovana Kovac
 */
@Entity
@Table(name = "hoteli")
@NamedQueries({
    @NamedQuery(name = "Hoteli.findAll", query = "SELECT h FROM Hoteli h")})
public class Hoteli implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "ID")
    private Integer id;
    @Basic(optional = false)
    @Lob
    @Column(name = "IME")
    private String ime;
    @Basic(optional = false)
    @Lob
    @Column(name = "ADRESA")
    private String adresa;
    @Basic(optional = false)
    @Column(name = "TELEFON")
    private long telefon;
    @JoinColumn(name = "ID", referencedColumnName = "ID", insertable = false, updatable = false)
    @OneToOne(optional = false)
    private Sobe sobe;

    @Inject
    public Hoteli() {
    }

    public Hoteli(Integer id) {
        this.id = id;
    }

    public Hoteli(Integer id, String ime, String adresa, long telefon) {
        this.id = id;
        this.ime = ime;
        this.adresa = adresa;
        this.telefon = telefon;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    @Validate("required")
    public String getIme() {
        return ime;
    }

    public void setIme(String ime) {
        this.ime = ime;
    }

    @Validate("required")
    public String getAdresa() {
        return adresa;
    }

    public void setAdresa(String adresa) {
        this.adresa = adresa;
    }

    @Validate("required")
    public long getTelefon() {
        return telefon;
    }

    public void setTelefon(long telefon) {
        this.telefon = telefon;
    }

    @Validate("required")
    public Sobe getSobe() {
        return sobe;
    }

    public void setSobe(Sobe sobe) {
        this.sobe = sobe;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (id != null ? id.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Hoteli)) {
            return false;
        }
        Hoteli other = (Hoteli) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.mycompany.methotels.entities.Hoteli[ id=" + id + " ]";
    }

}
