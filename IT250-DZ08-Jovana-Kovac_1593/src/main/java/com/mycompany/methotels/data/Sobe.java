/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mycompany.methotels.data;

import org.apache.tapestry5.ioc.annotations.Inject;

/**
 *
 * @author Jovana Kovac
 */
public class Sobe {
    private String imeSobe;
    private int sprat;
    private String tvInternetDjakuzi;

    @Inject
    public Sobe() {
    }

    public Sobe(String imeSobe, int sprat, String tvInternetDjakuzi) {
        this.imeSobe = imeSobe;
        this.sprat = sprat;
        this.tvInternetDjakuzi = tvInternetDjakuzi;
    }


    public String getImeSobe() {
        return imeSobe;
    }

    public void setImeSobe(String imeSobe) {
        this.imeSobe = imeSobe;
    }

    public int getSprat() {
        return sprat;
    }

    public void setSprat(int sprat) {
        this.sprat = sprat;
    }

    public String getTvInternetDjakuzi() {
        return tvInternetDjakuzi;
    }

    public void setTvInternetDjakuzi(String tvInternetDjakuzi) {
        this.tvInternetDjakuzi = tvInternetDjakuzi;
    }

}
