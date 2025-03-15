package com.taxcalculator.views;

import javax.swing.*;
import java.awt.*;
import java.awt.event.*;

public class MainFrame extends JFrame {
    private JPanel cards;
    private CardLayout cardLayout;
    private WelcomePanel welcomePanel;
    private LotPanel lotPanel;
    private VehiclePanel vehiclePanel;
    private HousingPanel housingPanel;
    
    public MainFrame() {
        setTitle("Sistema de Liquidación de Impuestos");
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setSize(800, 600);
        setLocationRelativeTo(null);
        
        // Initialize card layout
        cardLayout = new CardLayout();
        cards = new JPanel(cardLayout);
        
        // Create panels
        welcomePanel = new WelcomePanel(this);
        lotPanel = new LotPanel(this);
        vehiclePanel = new VehiclePanel(this);
        housingPanel = new HousingPanel(this);
        
        // Add panels to card layout
        cards.add(welcomePanel, "Welcome");
        cards.add(lotPanel, "Lot");
        cards.add(vehiclePanel, "Vehicle");
        cards.add(housingPanel, "Housing");
        
        // Add cards to frame
        add(cards);
        
        // Show welcome panel by default
        cardLayout.show(cards, "Welcome");
    }
    
    public void showPanel(String panelName) {
        cardLayout.show(cards, panelName);
    }
    
    public void updateTotalTaxes(double amount, String type) {
        welcomePanel.updateTax(amount, type);
    }
}