/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mycompany.methotels.pages;

import com.mycompany.methotels.entities.Hoteli;
import com.mycompany.methotels.interfaces.HotelsDAO;
import com.mycompany.methotels.entities.Sobe;
import java.util.ArrayList;
import java.util.List;
import org.apache.tapestry5.annotations.Persist;
import org.apache.tapestry5.annotations.Property;
import org.apache.tapestry5.hibernate.annotations.CommitAfter;
import org.apache.tapestry5.ioc.annotations.Inject;

/**
 *
 * @author Jovana Kovac
 */
public class DodavanjeSobe {

    @Property
    private Sobe sobe;
    @Property
    private Hoteli hoteli;
    @Property
    private Sobe onesoba;
    @Inject
    private HotelsDAO hotelsDao;
    @Property
    private List<Sobe> sveSobe;
    @Property
    @Persist
    private List<Hoteli> sviHoteli;

    void onActivate() {
        if (sveSobe == null) {
            sveSobe = new ArrayList<Sobe>();
        }
        sveSobe = hotelsDao.getListaSvihSoba();
    }

    public String getIme() {
        return hoteli.getIme();
    }

    @CommitAfter
    Object onSuccess() {
        hotelsDao.dodajSobu(sobe);
        return this;
    }
}
