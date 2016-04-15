/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mycompany.methotels.pages;

import com.mycompany.methotels.entities.Hoteli;
import com.mycompany.methotels.interfaces.HotelsDAO;
import com.mycompany.methotels.entities.Sobe;
import java.util.List;
import org.apache.tapestry5.ioc.annotations.Inject;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;

/**
 *
 * @author Jovana Kovac
 */
public class HotelsDaoImpl implements HotelsDAO {

    @Inject
    private Session session;

    @Override
    public List<Sobe> getListaSvihSoba() {
        return session.createCriteria(Sobe.class).list();
    }

    @Override
    public void dodajSobu(Sobe sobe) {
        session.persist(sobe);
    }

    @Override
    public List<Hoteli> getListaSvihHotela() {
        return session.createCriteria(Hoteli.class).list();
    }

    @Override
    public Hoteli getHotelIme(String ime) {
        return (Hoteli) session.createCriteria(Hoteli.class).add(Restrictions.eq("ime",ime)).uniqueResult();
    }

}
