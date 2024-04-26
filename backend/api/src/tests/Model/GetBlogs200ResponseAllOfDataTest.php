<?php

/**
 * FLUG Service API
 * PHP version 7.4
 *
 * @package OpenAPIServer
 * @author  OpenAPI Generator team
 * @link    https://github.com/openapitools/openapi-generator
 */

/**
 * A service API for the Fyns Linux User Group website
 * The version of the OpenAPI document: 0.1.0
 * Generated by: https://github.com/openapitools/openapi-generator.git
 */

/**
 * NOTE: This class is auto generated by the openapi generator program.
 * https://github.com/openapitools/openapi-generator
 * Please update the test case below to test the model.
 */
namespace OpenAPIServer\Model;

use PHPUnit\Framework\TestCase;
use OpenAPIServer\Model\GetBlogs200ResponseAllOfData;

/**
 * GetBlogs200ResponseAllOfDataTest Class Doc Comment
 *
 * @package OpenAPIServer\Model
 * @author  OpenAPI Generator team
 * @link    https://github.com/openapitools/openapi-generator
 *
 * @coversDefaultClass \OpenAPIServer\Model\GetBlogs200ResponseAllOfData
 */
class GetBlogs200ResponseAllOfDataTest extends TestCase
{

    /**
     * Setup before running any test cases
     */
    public static function setUpBeforeClass(): void
    {
    }

    /**
     * Setup before running each test case
     */
    public function setUp(): void
    {
    }

    /**
     * Clean up after running each test case
     */
    public function tearDown(): void
    {
    }

    /**
     * Clean up after running all test cases
     */
    public static function tearDownAfterClass(): void
    {
    }

    /**
     * Test "GetBlogs200ResponseAllOfData"
     */
    public function testGetBlogs200ResponseAllOfData()
    {
        $testGetBlogs200ResponseAllOfData = new GetBlogs200ResponseAllOfData();
        $namespacedClassname = GetBlogs200ResponseAllOfData::getModelsNamespace() . '\\GetBlogs200ResponseAllOfData';
        $this->assertSame('\\' . GetBlogs200ResponseAllOfData::class, $namespacedClassname);
        $this->assertTrue(
            class_exists($namespacedClassname),
            sprintf('Assertion failed that "%s" class exists', $namespacedClassname)
        );
        self::markTestIncomplete(
            'Test of "GetBlogs200ResponseAllOfData" model has not been implemented yet.'
        );
    }

    /**
     * Test attribute "items"
     */
    public function testPropertyItems()
    {
        self::markTestIncomplete(
            'Test of "items" property in "GetBlogs200ResponseAllOfData" model has not been implemented yet.'
        );
    }

    /**
     * Test attribute "pagination"
     */
    public function testPropertyPagination()
    {
        self::markTestIncomplete(
            'Test of "pagination" property in "GetBlogs200ResponseAllOfData" model has not been implemented yet.'
        );
    }

    /**
     * Test attribute "results"
     */
    public function testPropertyResults()
    {
        self::markTestIncomplete(
            'Test of "results" property in "GetBlogs200ResponseAllOfData" model has not been implemented yet.'
        );
    }

    /**
     * Test attribute "totalResults"
     */
    public function testPropertyTotalResults()
    {
        self::markTestIncomplete(
            'Test of "totalResults" property in "GetBlogs200ResponseAllOfData" model has not been implemented yet.'
        );
    }

    /**
     * Test attribute "page"
     */
    public function testPropertyPage()
    {
        self::markTestIncomplete(
            'Test of "page" property in "GetBlogs200ResponseAllOfData" model has not been implemented yet.'
        );
    }

    /**
     * Test attribute "totalPages"
     */
    public function testPropertyTotalPages()
    {
        self::markTestIncomplete(
            'Test of "totalPages" property in "GetBlogs200ResponseAllOfData" model has not been implemented yet.'
        );
    }

    /**
     * Test getOpenApiSchema static method
     * @covers ::getOpenApiSchema
     */
    public function testGetOpenApiSchema()
    {
        $schemaArr = GetBlogs200ResponseAllOfData::getOpenApiSchema();
        $this->assertIsArray($schemaArr);
    }
}

