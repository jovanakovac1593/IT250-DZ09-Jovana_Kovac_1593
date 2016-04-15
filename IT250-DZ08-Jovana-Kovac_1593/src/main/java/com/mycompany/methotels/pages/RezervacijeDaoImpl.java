/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mycompany.methotels.pages;

import com.mycompany.methotels.entities.Rezervacija;
import com.mycompany.methotels.interfaces.RezervacijeDAO;
import org.apache.tapestry5.ioc.annotations.Inject;
import org.hibernate.Session;

/**
 *
 * @author Jovana Kovac
 */
public class RezervacijeDaoImpl implements RezervacijeDAO {

    @Inject
    private Session session;

    @Override
    public void dodajRezervaciju(Rezervacija rezervacija) {
        session.persist(rezervacija);
    }
}
