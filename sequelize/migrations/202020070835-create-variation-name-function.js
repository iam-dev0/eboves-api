module.exports.up = (queryInterface, DataTypes) => {
  return queryInterface.sequelize.query(`
    create function product_variation_name(product_variation_id bigint unsigned)
                returns varchar(255)
                deterministic
            begin
                declare product_variation_name varchar(255);
                select concat(b.name, ' - ', p.name, ' / ', coalesce(group_concat(concat(a.name, ':', if(a.type = 'image', apv.alt, apv.value))),''))
                into product_variation_name
                from product_variations
						 left join products p on product_variations.productId = p.id
                         left join brands b on p.brandId = b.id
                         left join product_variation_attribute_values apv on product_variations.id = apv.productVariationId
                         left join attributes a on apv.attributeId = a.id
                where product_variations.id = product_variation_id group by product_variations.id;
    
                return product_variation_name;
            end;`);
};

module.exports.down = (queryInterface) =>
  queryInterface.sequelize.query(" drop function product_variation_name");
