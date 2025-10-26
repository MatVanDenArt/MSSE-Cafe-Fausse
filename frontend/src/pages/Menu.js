import React, { useState, useEffect } from "react";
import "./Menu.css";

const Menu = () => {
  const [menu, setMenu] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/menu");
        if (response.ok) {
          const data = await response.json();
          setMenu(data);
        } else {
          // Fallback menu data
          setMenu({
            starters: [
              { name: "Bruschetta", description: "Fresh tomatoes, basil, olive oil, and toasted baguette slices", price: 8.50 },
              { name: "Caesar Salad", description: "Crisp romaine with homemade Caesar dressing", price: 9.00 }
            ],
            main_courses: [
              { name: "Grilled Salmon", description: "Served with lemon butter sauce and seasonal vegetables", price: 22.00 },
              { name: "Ribeye Steak", description: "12 oz prime cut with garlic mashed potatoes", price: 28.00 },
              { name: "Vegetable Risotto", description: "Creamy Arborio rice with wild mushrooms", price: 18.00 }
            ],
            desserts: [
              { name: "Tiramisu", description: "Classic Italian dessert with mascarpone", price: 7.50 },
              { name: "Cheesecake", description: "Creamy cheesecake with berry compote", price: 7.00 }
            ],
            beverages: [
              { name: "Red Wine (Glass)", description: "A selection of Italian reds", price: 10.00 },
              { name: "White Wine (Glass)", description: "Crisp and refreshing", price: 9.00 },
              { name: "Craft Beer", description: "Local artisan brews", price: 6.00 },
              { name: "Espresso", description: "Strong and aromatic", price: 3.00 }
            ]
          });
        }
      } catch (error) {
        console.error("Error fetching menu:", error);
        // Use fallback data
        setMenu({
          starters: [
            { name: "Bruschetta", description: "Fresh tomatoes, basil, olive oil, and toasted baguette slices", price: 8.50 },
            { name: "Caesar Salad", description: "Crisp romaine with homemade Caesar dressing", price: 9.00 }
          ],
          main_courses: [
            { name: "Grilled Salmon", description: "Served with lemon butter sauce and seasonal vegetables", price: 22.00 },
            { name: "Ribeye Steak", description: "12 oz prime cut with garlic mashed potatoes", price: 28.00 },
            { name: "Vegetable Risotto", description: "Creamy Arborio rice with wild mushrooms", price: 18.00 }
          ],
          desserts: [
            { name: "Tiramisu", description: "Classic Italian dessert with mascarpone", price: 7.50 },
            { name: "Cheesecake", description: "Creamy cheesecake with berry compote", price: 7.00 }
          ],
          beverages: [
            { name: "Red Wine (Glass)", description: "A selection of Italian reds", price: 10.00 },
            { name: "White Wine (Glass)", description: "Crisp and refreshing", price: 9.00 },
            { name: "Craft Beer", description: "Local artisan brews", price: 6.00 },
            { name: "Espresso", description: "Strong and aromatic", price: 3.00 }
          ]
        });
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  const MenuSection = ({ title, items, imageName }) => (
    <div className="menu-section">
      <div className="menu-section-header">
        <h2>{title}</h2>
        {imageName && (
          <img 
            src={`../../Docs/Images/Menu - ${imageName}.webp`} 
            alt={title}
            className="menu-section-image"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        )}
      </div>
      <div className="menu-items">
        {items.map((item, index) => (
          <div key={index} className="menu-item">
            <div className="menu-item-content">
              <h3 className="menu-item-name">{item.name}</h3>
              <p className="menu-item-description">{item.description}</p>
            </div>
            <div className="menu-item-price">${item.price.toFixed(2)}</div>
          </div>
        ))}
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="menu">
        <div className="container">
          <div className="section-title">
            <h1>Notre Menu</h1>
            <p>Loading our delicious menu...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="menu">
      <div className="container">
        <div className="section-title">
          <h1>Notre Menu</h1>
          <h2>A Celebration of French Gastronomy</h2>
          <p>
            Our menu is a living story, one that changes with the seasons but is 
            always rooted in the fundamentals of French cuisine. Our culinary team 
            meticulously prepares each dish with passion, precision, and the freshest 
            ingredients available.
          </p>
          <p className="menu-disclaimer">
            Please inform our staff of any allergies or dietary restrictions.
          </p>
        </div>

        {menu && (
          <div className="menu-content">
            <MenuSection 
              title="Starters" 
              items={menu.starters} 
              imageName="Bruschetta"
            />
            
            <MenuSection 
              title="Main Courses" 
              items={menu.main_courses} 
              imageName="Ribeye Steak"
            />
            
            <MenuSection 
              title="Desserts" 
              items={menu.desserts} 
              imageName="Tiramisu"
            />
            
            <MenuSection 
              title="Beverages" 
              items={menu.beverages} 
              imageName="Red Wine"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;
