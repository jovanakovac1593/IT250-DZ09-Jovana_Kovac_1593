/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mycompany.methotels.entities;

import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
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
@Table(name = "sobe")
@NamedQueries({
    @NamedQuery(name = "Sobe.findAll", query = "SELECT s FROM Sobe s")})
public class Sobe implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "ID")
    private Integer id;
    @Basic(optional = false)
    @Lob
    @Column(name = "Ime sobe")
    private String imesobe;
    @Basic(optional = false)
    @Column(name = "Sprat")
    private int sprat;
    @Basic(optional = false)
    @Lob
    @Column(name = "TvInternetDjakuzi")
    private String tvInternetDjakuzi;
    @OneToOne(cascade = CascadeType.ALL, mappedBy = "sobe")
    private Hoteli hoteli;

    @Inject
    public Sobe() {
    }

    public Sobe(Integer id) {
        this.id = id;
    }

    public Sobe(Integer id, String imesobe, int sprat, String tvInternetDjakuzi) {
        this.id = id;
        this.imesobe = imesobe;
        this.sprat = sprat;
        this.tvInternetDjakuzi = tvInternetDjakuzi;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }
    @Validate("required")
    public String getImesobe() {
        return imesobe;
    }

    public void setImesobe(String imesobe) {
        this.imesobe = imesobe;
    }
    @Validate("required")
    public int getSprat() {
        return sprat;
    }

    public void setSprat(int sprat) {
        this.sprat = sprat;
    }
    @Validate("required")
    public String getTvInternetDjakuzi() {
        return tvInternetDjakuzi;
    }

    public void setTvInternetDjakuzi(String tvInternetDjakuzi) {
        this.tvInternetDjakuzi = tvInternetDjakuzi;
    }

    public Hoteli getHoteli() {
        return hoteli;
    }

    public void setHoteli(Hoteli hoteli) {
        this.hoteli = hoteli;
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
        if (!(object instanceof Sobe)) {
            return false;
        }
        Sobe other = (Sobe) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.mycompany.methotels.entities.Sobe[ id=" + id + " ]";
    }

}
