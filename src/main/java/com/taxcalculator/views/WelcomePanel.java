package com.taxcalculator.views;

import javax.swing.*;
import java.awt.*;
import java.text.NumberFormat;
import java.util.Locale;

public class WelcomePanel extends JPanel {
    private MainFrame mainFrame;
    private JLabel lotTaxLabel;
    private JLabel vehicleTaxLabel;
    private JLabel housingTaxLabel;
    private JLabel totalTaxLabel;
    private double lotTax = 0;
    private double vehicleTax = 0;
    private double housingTax = 0;
    
    public WelcomePanel(MainFrame mainFrame) {
        this.mainFrame = mainFrame;
        setLayout(new BorderLayout());
        
        // Title Panel
        JPanel titlePanel = new JPanel();
        JLabel titleLabel = new JLabel("Bienvenido al Sistema de Liquidación de Impuestos");
        titleLabel.setFont(new Font("Arial", Font.BOLD, 24));
        titlePanel.add(titleLabel);
        
        // Tax Summary Panel
        JPanel taxSummaryPanel = new JPanel(new GridLayout(2, 2, 10, 10));
        taxSummaryPanel.setBorder(BorderFactory.createEmptyBorder(20, 20, 20, 20));
        
        lotTaxLabel = createTaxLabel("Impuesto Lotes: $0.00");
        vehicleTaxLabel = createTaxLabel("Impuesto Vehículos: $0.00");
        housingTaxLabel = createTaxLabel("Impuesto Viviendas: $0.00");
        totalTaxLabel = createTaxLabel("Total Impuestos: $0.00");
        
        taxSummaryPanel.add(lotTaxLabel);
        taxSummaryPanel.add(vehicleTaxLabel);
        taxSummaryPanel.add(housingTaxLabel);
        taxSummaryPanel.add(totalTaxLabel);
        
        // Buttons Panel
        JPanel buttonsPanel = new JPanel(new GridLayout(1, 3, 10, 10));
        buttonsPanel.setBorder(BorderFactory.createEmptyBorder(20, 20, 20, 20));
        
        JButton lotButton = createNavigationButton("Liquidar Lote", "Lot");
        JButton vehicleButton = createNavigationButton("Liquidar Vehículo", "Vehicle");
        JButton housingButton = createNavigationButton("Liquidar Vivienda", "Housing");
        
        buttonsPanel.add(lotButton);
        buttonsPanel.add(vehicleButton);
        buttonsPanel.add(housingButton);
        
        // Add components to main panel
        add(titlePanel, BorderLayout.NORTH);
        add(taxSummaryPanel, BorderLayout.CENTER);
        add(buttonsPanel, BorderLayout.SOUTH);
    }
    
    private JLabel createTaxLabel(String text) {
        JLabel label = new JLabel(text);
        label.setFont(new Font("Arial", Font.PLAIN, 16));
        return label;
    }
    
    private JButton createNavigationButton(String text, String destination) {
        JButton button = new JButton(text);
        button.addActionListener(e -> mainFrame.showPanel(destination));
        return button;
    }
    
    public void updateTax(double amount, String type) {
        NumberFormat formatter = NumberFormat.getCurrencyInstance(new Locale("es", "CO"));
        
        switch (type) {
            case "lotTax":
                lotTax = amount;
                lotTaxLabel.setText("Impuesto Lotes: " + formatter.format(amount));
                break;
            case "vehicleTax":
                vehicleTax = amount;
                vehicleTaxLabel.setText("Impuesto Vehículos: " + formatter.format(amount));
                break;
            case "housingTax":
                housingTax = amount;
                housingTaxLabel.setText("Impuesto Viviendas: " + formatter.format(amount));
                break;
        }
        
        double total = lotTax + vehicleTax + housingTax;
        totalTaxLabel.setText("Total Impuestos: " + formatter.format(total));
    }
}